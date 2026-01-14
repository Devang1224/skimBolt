"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkAndSaveContent = void 0;
const textsplitters_1 = require("@langchain/textsplitters");
const geminiApi_1 = require("../lib/geminiApi");
const prompt_1 = require("../prompt");
const db_1 = __importDefault(require("../lib/db"));
const MAX_CONTENT_LENGTH = 1000000; // ~1MB of text
const MAX_CHUNKS = 500; // preventing excessive API calls
const CHUNK_SIZE = 3000;
const CHUNK_OVERLAP = 200;
const DB_BATCH_SIZE = 100; // batch db inserts to avoid query size limits
const LLM_TIMEOUT_MS = 30000; // 30 seconds per llm call
const EMBEDDING_TIMEOUT_MS = 60000; // 60 seconds for embedding generation
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE_MS = 1000; // base delay for exponential backoff
// Retry utility with exponential backoff
// async function retryWithBackoff<T>(
//   fn: () => Promise<T>,
//   maxRetries: number = MAX_RETRIES,
//   baseDelay: number = RETRY_DELAY_BASE_MS
// ): Promise<T> {
//   let lastError: Error | undefined;
//   for (let attempt = 0; attempt < maxRetries; attempt++) {
//     try {
//       return await fn();
//     } catch (error) {
//       lastError = error as Error;
//       if (attempt < maxRetries - 1) {
//         const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000; // Add jitter
//         logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
//           error: error instanceof Error ? error.message : String(error),
//         });
//         await new Promise((resolve) => setTimeout(resolve, delay));
//       }
//     }
//   }
//   throw lastError || new Error("Retry failed");
// }
function withTimeout(promise, timeoutMs, operation) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`${operation} timed out after ${timeoutMs}ms`)), timeoutMs)),
    ]);
}
// summarizing a single chunk with timeout
function summarizeChunk(text, chunkIndex, totalChunks) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!text || text.trim().length === 0) {
            throw new Error("Empty chunk text provided");
        }
        const summarizeFn = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield withTimeout(geminiApi_1.llm.invoke([
                {
                    role: "system",
                    content: `${prompt_1.BASE_PROMPT}
Summarize the following content into a concise, factual summary.
- Preserve key ideas and important details
- Remove redundancy
- Write in neutral, clear language
- Do NOT add information that is not present
- Keep the summary compact and suitable as reusable Q&A context for other AI models.`,
                },
                {
                    role: "user",
                    content: text,
                },
            ]), LLM_TIMEOUT_MS, `LLM summarize chunk ${chunkIndex + 1}/${totalChunks}`);
            const summary = res.content;
            if (!summary || summary.trim().length === 0) {
                throw new Error("Empty summary returned from LLM");
            }
            return summary;
        });
        try {
            const summary = yield summarizeFn();
            return summary;
        }
        catch (error) {
            console.log(`Failed to summarize chunk ${chunkIndex + 1}/${totalChunks}`, error, {
                chunkLength: text.length,
                chunkPreview: text.substring(0, 100),
            });
            throw error;
        }
    });
}
function batchInsertChunks(urlArray, summarizedChunks, embeddings, batchSize = DB_BATCH_SIZE) {
    return __awaiter(this, void 0, void 0, function* () {
        if (urlArray.length !== summarizedChunks.length || urlArray.length !== embeddings.length) {
            throw new Error("Array length mismatch for batch insert");
        }
        // processing in batches to avoid query size limits
        for (let i = 0; i < urlArray.length; i += batchSize) {
            const batchUrls = urlArray.slice(i, i + batchSize);
            const batchChunks = summarizedChunks.slice(i, i + batchSize);
            const batchEmbeddings = embeddings.slice(i, i + batchSize);
            const embeddingStrings = batchEmbeddings.map((e) => `[${e.join(',')}]`);
            try {
                yield db_1.default.$executeRaw `
        INSERT INTO blog_summary_chunks (source_url, content, embedding)
        SELECT source_url, content, embedding::vector
        FROM UNNEST(
          ${batchUrls}::text[],
          ${batchChunks}::text[],
          ${embeddingStrings}::text[]
        ) AS t(source_url, content, embedding)
        ON CONFLICT DO NOTHING;
      `;
                console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}`, {
                    batchSize: batchUrls.length,
                    startIndex: i,
                });
            }
            catch (error) {
                console.log(`Failed to insert batch ${Math.floor(i / batchSize) + 1}`, error, {
                    batchSize: batchUrls.length,
                    startIndex: i,
                });
                throw error;
            }
        }
    });
}
// Main function
function chunkAndSaveContent(content, hashedUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        const correlationId = `${hashedUrl.substring(0, 8)}-${Date.now()}`;
        console.log("Starting chunk and save process", {
            correlationId,
            contentLength: content.length,
            hashedUrl: hashedUrl.substring(0, 20) + "...",
        });
        try {
            if (!content || typeof content !== "string") {
                throw new Error("Invalid content: must be a non-empty string");
            }
            if (!hashedUrl || typeof hashedUrl !== "string") {
                throw new Error("Invalid hashedUrl: must be a non-empty string");
            }
            if (content.length > MAX_CONTENT_LENGTH) {
                console.log("Content exceeds maximum length, truncating", {
                    contentLength: content.length,
                    maxLength: MAX_CONTENT_LENGTH,
                });
                content = content.substring(0, MAX_CONTENT_LENGTH);
            }
            if (content.trim().length === 0) {
                throw new Error("Content is empty after trimming");
            }
            // Split content into chunks
            const splitter = new textsplitters_1.RecursiveCharacterTextSplitter({
                chunkSize: CHUNK_SIZE,
                chunkOverlap: CHUNK_OVERLAP,
            });
            const chunks = yield splitter.splitText(content);
            const totalChunks = chunks.length;
            console.log("content split into chunks", {
                correlationId,
                totalChunks,
                avgChunkSize: Math.round(content.length / totalChunks),
            });
            // validating chunk count
            if (totalChunks > MAX_CHUNKS) {
                console.log("chunk count exceeds maximum, processing first N chunks", {
                    correlationId,
                    totalChunks,
                    maxChunks: MAX_CHUNKS,
                });
                chunks.splice(MAX_CHUNKS);
            }
            if (chunks.length === 0) {
                throw new Error("No chunks generated from content");
            }
            console.log("Starting chunk summarization", {
                correlationId,
                chunksToProcess: chunks.length,
            });
            const summarizeStartTime = Date.now();
            const summarizedResults = yield Promise.allSettled(chunks.map((chunk, index) => summarizeChunk(chunk, index, chunks.length)));
            const summarizeDuration = Date.now() - summarizeStartTime;
            const successfulChunks = summarizedResults
                .filter((result) => result.status === "fulfilled")
                .map((result) => result.value);
            const failedChunks = summarizedResults.filter((result) => result.status === "rejected").length;
            console.log("Chunk summarization completed", {
                correlationId,
                successful: successfulChunks.length,
                failed: failedChunks,
                durationMs: summarizeDuration,
                avgTimePerChunk: Math.round(summarizeDuration / chunks.length),
            });
            if (successfulChunks.length === 0) {
                throw new Error("All chunk summarizations failed");
            }
            // Generate embeddings
            console.log("Generating embeddings", {
                correlationId,
                chunksToEmbed: successfulChunks.length,
            });
            const embeddingStartTime = Date.now();
            const embeddings = yield withTimeout(geminiApi_1.embedd.embedDocuments(successfulChunks), EMBEDDING_TIMEOUT_MS, "Embedding generation");
            const embeddingDuration = Date.now() - embeddingStartTime;
            if (embeddings.length !== successfulChunks.length) {
                throw new Error(`Embedding count mismatch: expected ${successfulChunks.length}, got ${embeddings.length}`);
            }
            console.log("Embeddings generated", {
                correlationId,
                embeddingCount: embeddings.length,
                durationMs: embeddingDuration,
            });
            const urlArray = Array(successfulChunks.length).fill(hashedUrl);
            // batch insert into database
            console.log("Inserting chunks into database", {
                correlationId,
                chunksToInsert: successfulChunks.length,
                batches: Math.ceil(successfulChunks.length / DB_BATCH_SIZE),
            });
            const dbStartTime = Date.now();
            yield batchInsertChunks(urlArray, successfulChunks, embeddings, DB_BATCH_SIZE);
            const dbDuration = Date.now() - dbStartTime;
            const totalDuration = Date.now() - startTime;
            console.log("Chunk and save process completed successfully", {
                correlationId,
                totalChunks,
                successfulChunks: successfulChunks.length,
                failedChunks,
                totalDurationMs: totalDuration,
                summarizeDurationMs: summarizeDuration,
                embeddingDurationMs: embeddingDuration,
                dbDurationMs: dbDuration,
            });
            return {
                success: true,
                chunksProcessed: successfulChunks.length,
                chunksFailed: failedChunks,
                totalChunks: chunks.length,
            };
        }
        catch (error) {
            const totalDuration = Date.now() - startTime;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log("Chunk and save process failed", error, {
                correlationId,
                durationMs: totalDuration,
                hashedUrl: hashedUrl.substring(0, 20) + "...",
            });
            return {
                success: false,
                chunksProcessed: 0,
                chunksFailed: 0,
                totalChunks: 0,
                error: errorMessage,
            };
        }
    });
}
exports.chunkAndSaveContent = chunkAndSaveContent;

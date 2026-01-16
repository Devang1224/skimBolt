"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
function withTimeout(promise, timeoutMs, operation) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`${operation} timed out after ${timeoutMs}ms`)), timeoutMs)),
    ]);
}
exports.withTimeout = withTimeout;

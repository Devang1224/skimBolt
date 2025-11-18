-- CreateTable
CREATE TABLE "Summary" (
    "id" TEXT NOT NULL,
    "urlHash" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummaryQuestion" (
    "id" TEXT NOT NULL,
    "summaryId" TEXT NOT NULL,
    "aiAnswer" TEXT NOT NULL,
    "userQuestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SummaryQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Summary_urlHash_idx" ON "Summary"("urlHash");

-- CreateIndex
CREATE UNIQUE INDEX "Summary_userId_urlHash_key" ON "Summary"("userId", "urlHash");

-- CreateIndex
CREATE INDEX "SummaryQuestion_summaryId_idx" ON "SummaryQuestion"("summaryId");

-- CreateIndex
CREATE INDEX "SummaryQuestion_summaryId_createdAt_idx" ON "SummaryQuestion"("summaryId", "createdAt");

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummaryQuestion" ADD CONSTRAINT "SummaryQuestion_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "Summary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

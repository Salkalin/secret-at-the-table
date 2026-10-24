-- CreateTable
CREATE TABLE "GameLog" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'info',
    "event" TEXT NOT NULL,
    "actor" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameLog_sessionId_idx" ON "GameLog"("sessionId");

-- CreateIndex
CREATE INDEX "GameLog_code_idx" ON "GameLog"("code");

-- CreateIndex
CREATE INDEX "GameLog_createdAt_idx" ON "GameLog"("createdAt");

-- CreateIndex
CREATE INDEX "GameLog_event_idx" ON "GameLog"("event");

-- AddForeignKey
ALTER TABLE "GameLog" ADD CONSTRAINT "GameLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

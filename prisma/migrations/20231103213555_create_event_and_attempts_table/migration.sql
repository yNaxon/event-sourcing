-- CreateEnum
CREATE TYPE "EventProcessingStatus" AS ENUM ('IN_PROGRESS', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_processing_attempts" (
    "id" TEXT NOT NULL,
    "processorName" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "status" "EventProcessingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "error" JSONB,

    CONSTRAINT "event_processing_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_processing_attempts_eventId_processorName_idx" ON "event_processing_attempts"("eventId", "processorName");

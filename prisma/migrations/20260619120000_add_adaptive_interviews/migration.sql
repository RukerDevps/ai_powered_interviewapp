-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('in_progress', 'completed', 'abandoned', 'incomplete', 'not_eligible');

-- CreateEnum
CREATE TYPE "InterviewDifficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "skills" TEXT[],
    "durationMinutes" INTEGER NOT NULL,
    "questionTarget" TEXT,
    "timePerQuestion" TEXT,
    "sections" TEXT[],
    "questionFocus" TEXT NOT NULL,
    "jobDescriptionText" TEXT,
    "status" "InterviewStatus" NOT NULL DEFAULT 'in_progress',
    "currentDifficulty" "InterviewDifficulty" NOT NULL DEFAULT 'medium',
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "veryPoorTotal" INTEGER NOT NULL DEFAULT 0,
    "consecutiveVeryPoor" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "difficulty" "InterviewDifficulty" NOT NULL,
    "answerText" TEXT,
    "answerSubmittedAt" TIMESTAMP(3),
    "answerScore" INTEGER,
    "clarityScore" INTEGER,
    "relevanceScore" INTEGER,
    "depthScore" INTEGER,
    "confidenceScore" INTEGER,
    "evaluationSummary" TEXT,
    "feedback" TEXT,
    "veryPoor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewAnalytics" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "clarityScore" INTEGER NOT NULL,
    "relevanceScore" INTEGER NOT NULL,
    "technicalDepthScore" INTEGER NOT NULL,
    "confidenceScore" INTEGER NOT NULL,
    "strengths" TEXT[],
    "improvements" TEXT[],
    "questionFeedback" JSONB NOT NULL,
    "speakingPaceLabel" TEXT,
    "confidenceTrend" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interview_userId_status_idx" ON "Interview"("userId", "status");

-- CreateIndex
CREATE INDEX "Interview_userId_startedAt_idx" ON "Interview"("userId", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestion_interviewId_order_key" ON "InterviewQuestion"("interviewId", "order");

-- CreateIndex
CREATE INDEX "InterviewQuestion_interviewId_idx" ON "InterviewQuestion"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewAnalytics_interviewId_key" ON "InterviewAnalytics"("interviewId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewAnalytics" ADD CONSTRAINT "InterviewAnalytics_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

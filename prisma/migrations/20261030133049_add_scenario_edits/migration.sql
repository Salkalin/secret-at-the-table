-- CreateTable
CREATE TABLE "ScenarioEdit" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScenarioEdit_pkey" PRIMARY KEY ("id")
);

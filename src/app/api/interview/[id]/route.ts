import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { validateActiveSession } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !(await validateActiveSession(session))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const interviewResult = await query<{
      id: string;
      role: string;
      experienceLevel: string;
      interviewType: string;
      durationMinutes: number;
      currentDifficulty: "easy" | "medium" | "hard";
      status: "in_progress" | "completed" | "abandoned" | "incomplete" | "not_eligible";
      completedAt: Date | null;
      hasAnalytics: boolean;
    }>(
      `
        SELECT
          i.id,
          i.role,
          i."experienceLevel",
          i."interviewType",
          i."durationMinutes",
          i."currentDifficulty",
          i.status,
          i."completedAt",
          EXISTS (
            SELECT 1
            FROM "InterviewAnalytics" a
            WHERE a."interviewId" = i.id
          ) AS "hasAnalytics"
        FROM "Interview" i
        WHERE i.id = $1 AND i."userId" = $2
        LIMIT 1
      `,
      [id, session.user.id]
    );

    const interview = interviewResult.rows[0];

    if (!interview) {
      return NextResponse.json(
        { success: false, error: "Interview not found." },
        { status: 404 }
      );
    }

    const questionsResult = await query<{
      id: string;
      order: number;
      questionText: string;
      difficulty: "easy" | "medium" | "hard";
      answerText: string | null;
      answerScore: number | null;
    }>(
      `
        SELECT
          q.id,
          q."order",
          q."questionText",
          q.difficulty,
          q."answerText",
          q."answerScore"
        FROM "InterviewQuestion" q
        WHERE q."interviewId" = $1
        ORDER BY q."order" ASC
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
      interview: {
        id: interview.id,
        role: interview.role,
        experienceLevel: interview.experienceLevel,
        interviewType: interview.interviewType,
        durationMinutes: interview.durationMinutes,
        currentDifficulty: interview.currentDifficulty,
        status: interview.status,
        completedAt: interview.completedAt,
        questions: questionsResult.rows.map((question) => ({
          id: question.id,
          order: question.order,
          text: question.questionText,
          difficulty: question.difficulty,
          answered: Boolean(question.answerText),
          answerScore: question.answerScore,
        })),
        hasAnalytics: interview.hasAnalytics,
      },
    });
  } catch (error) {
    console.error("Error loading interview:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

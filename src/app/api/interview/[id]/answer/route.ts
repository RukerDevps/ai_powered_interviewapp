import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { submitInterviewAnswerForUser } from "@/lib/interview-workflow";
import { KimiServiceError } from "@/lib/kimi";
import { validateActiveSession } from "@/lib/session";

const submitAnswerSchema = z.object({
  questionId: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !(await validateActiveSession(session))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = submitAnswerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid answer." },
        { status: 400 }
      );
    }

    const result = await submitInterviewAnswerForUser(session.user.id, {
      interviewId: id,
      questionId: parsed.data.questionId,
      answer: parsed.data.answer,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof KimiServiceError) {
      console.warn("AI provider could not score interview answer:", error.message);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          retryable: error.retryable,
        },
        { status: error.retryable ? 503 : 502 }
      );
    }

    console.error("Error submitting interview answer:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not submit answer. Please try again.",
      },
      { status: 500 }
    );
  }
}

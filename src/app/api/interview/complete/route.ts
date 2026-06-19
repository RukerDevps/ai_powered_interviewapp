import { InterviewStatus } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { finalizeInterviewForUser } from "@/lib/interview-workflow";
import { KimiServiceError } from "@/lib/kimi";
import { validateActiveSession } from "@/lib/session";

const completeInterviewSchema = z.object({
  interviewId: z.string().trim().min(1),
  status: z.enum(["completed", "incomplete"]).default("completed"),
});

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !(await validateActiveSession(session))) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = completeInterviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    const status =
      parsed.data.status === "incomplete"
        ? InterviewStatus.incomplete
        : InterviewStatus.completed;

    const analytics = await finalizeInterviewForUser(
      session.user.id,
      parsed.data.interviewId,
      status
    );

    return NextResponse.json({
      success: true,
      analyticsId: analytics.id,
      href: `/interview/${parsed.data.interviewId}/analysis`,
    });
  } catch (error) {
    if (error instanceof KimiServiceError) {
      console.warn("AI provider could not complete interview analysis:", error.message);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          retryable: error.retryable,
        },
        { status: error.retryable ? 503 : 502 }
      );
    }

    console.error("Error completing interview:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not complete interview. Please try again.",
      },
      { status: 500 }
    );
  }
}

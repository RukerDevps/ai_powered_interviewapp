import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { abandonInterviewForUser } from "@/lib/interview-workflow";
import { validateActiveSession } from "@/lib/session";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { reason } = body;
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !(await validateActiveSession(session))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(`[Proctoring Violation] Interview ${id} was abandoned. Reason: ${reason}`);
    await abandonInterviewForUser(session.user.id, id);
    
    return NextResponse.json({
      success: true,
      message: `Interview ${id} status set to abandoned.`,
      reason,
    });
  } catch (error) {
    console.error("Error logging proctoring violation:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

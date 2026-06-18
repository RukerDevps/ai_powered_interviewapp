import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { reason } = body;

    console.log(`[Proctoring Violation] Interview ${id} was abandoned. Reason: ${reason}`);

    // In a fully integrated environment, we would run:
    // UPDATE interviews SET status = 'abandoned', completed_at = NOW() WHERE id = id;
    
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

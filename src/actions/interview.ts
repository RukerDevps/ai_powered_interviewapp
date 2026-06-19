"use server";

import { z } from "zod";
import { createInterviewForUser } from "@/lib/interview-workflow";
import { requireActiveSession } from "@/lib/session";

const createInterviewSchema = z.object({
  role: z.string().trim().min(1),
  experienceLevel: z.string().trim().min(1),
  interviewType: z.string().trim().min(1),
  skills: z.array(z.string().trim().min(1)).max(20),
  duration: z.string().trim().min(1),
  questionTarget: z.string().trim().min(1),
  timePerQuestion: z.string().trim().min(1),
  sections: z.array(z.string().trim().min(1)).min(1),
  questionFocus: z.string().trim().min(1),
  jobDescriptionText: z.string().trim().max(12000).optional(),
});

export interface CreateInterviewActionResult {
  success: boolean;
  interviewId?: string;
  error?: string;
}

export async function createInterviewAction(
  input: z.infer<typeof createInterviewSchema>
): Promise<CreateInterviewActionResult> {
  try {
    const session = await requireActiveSession();
    const parsed = createInterviewSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Check your interview setup.",
      };
    }

    const interview = await createInterviewForUser(session.user.id, parsed.data);

    return {
      success: true,
      interviewId: interview.id,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not start interview. Please try again.",
    };
  }
}

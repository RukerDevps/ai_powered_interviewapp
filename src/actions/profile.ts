"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireActiveSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
});

export type UpdateProfileResult =
  | { success: true }
  | { success: false; error: string };

export async function updateProfileAction(
  formData: FormData
): Promise<UpdateProfileResult> {
  const session = await requireActiveSession();

  const rawName = formData.get("name");
  const validation = updateProfileSchema.safeParse({
    name: typeof rawName === "string" ? rawName : "",
  });

  if (!validation.success) {
    const message = validation.error.issues[0]?.message ?? "Invalid name";
    return { success: false, error: message };
  }

  const { name } = validation.data;
  const userId = session.user.id;

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { name },
      }),
      prisma.profile.upsert({
        where: { userId },
        update: { name },
        create: {
          userId,
          name,
          email: session.user.email,
          plan: "free",
        },
      }),
    ]);

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to save profile. Please try again." };
  }
}

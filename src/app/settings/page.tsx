import { requireActiveSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SettingsTabsClient } from "@/components/settings/SettingsTabsClient";

function formatMemberSince(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatAccountType(plan: string | null | undefined): string {
  const normalized = plan?.trim().toLowerCase() || "free";
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)} Plan`;
}

export default async function SettingsPage() {
  const session = await requireActiveSession();

  const userId = session.user.id;

  let profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId,
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
        plan: "free",
      },
    });
  }

  return (
    <SettingsTabsClient
      name={profile.name ?? session.user.name ?? ""}
      email={session.user.email ?? ""}
      memberSince={formatMemberSince(
        session.user.createdAt ?? profile.createdAt ?? new Date()
      )}
      accountType={formatAccountType(profile.plan)}
      avatar={session.user.image ?? profile.avatar}
    />
  );
}

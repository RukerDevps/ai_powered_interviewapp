"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InterviewSessionClient } from "./InterviewSessionClient";

function InterviewSessionLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  if (!id) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-background px-4 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-text-primary">No interview session was found.</p>
          <p className="text-sm text-text-secondary">Start a new interview from the setup page.</p>
        </div>
      </div>
    );
  }

  return <InterviewSessionClient interviewId={id} />;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh w-full items-center justify-center bg-background text-sm font-semibold text-text-secondary">
          Loading interview session...
        </div>
      }
    >
      <InterviewSessionLoader />
    </Suspense>
  );
}

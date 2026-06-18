"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InterviewSessionClient } from "./InterviewSessionClient";

function InterviewSessionLoader() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "session";
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

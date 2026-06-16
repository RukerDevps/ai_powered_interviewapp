import Link from "next/link";
import { Plus } from "lucide-react";

interface WelcomeHeaderProps {
  name: string;
}

export const WelcomeHeader = ({ name }: WelcomeHeaderProps) => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-normal text-text-primary">
          Welcome back, {name}!
        </h1>
        <p className="mt-3 text-base text-text-secondary">
          Ready to ace your next interview?
        </p>
      </div>

      <Link
        href="/interview/new"
        className="inline-flex w-full items-center justify-center gap-4 rounded-lg bg-accent px-6 py-5 text-left text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover sm:w-auto sm:min-w-[370px] sm:justify-start"
      >
        <Plus className="h-6 w-6 shrink-0" />
        <span>
          <span className="block text-lg font-bold">Start New Interview</span>
          <span className="mt-1 block text-sm font-medium text-accent-foreground">
            Begin a new AI mock interview
          </span>
        </span>
      </Link>
    </section>
  );
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black text-black dark:text-zinc-50 p-8">
      <main className="flex flex-col items-center max-w-2xl gap-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
          ✨ Welcome to JobPilot
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Your AI-Powered Job Hunting Assistant
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
          Automate job discovery, match roles against your unique skills, and generate deep company research dossiers instantly.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            Go to Dashboard
          </a>
          <a
            href="/profile"
            className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Complete Profile
          </a>
        </div>
      </main>
    </div>
  );
}


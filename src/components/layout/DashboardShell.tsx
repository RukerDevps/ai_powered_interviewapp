import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <div className="h-dvh overflow-hidden bg-surface">
      <div className="flex h-dvh min-h-0 overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-surface">
          <Header />
          <main className="min-h-0 flex-1 overflow-y-auto bg-surface px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

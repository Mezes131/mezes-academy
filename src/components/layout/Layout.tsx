import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { BackToTopButton } from "./BackToTopButton";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <BackToTopButton />
    </div>
  );
}

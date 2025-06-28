import { Logo } from "@/components/ui";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center min-h-screen justify-center gap-y-5 flex-col">
      <Logo />
      {children}
    </div>
  );
}

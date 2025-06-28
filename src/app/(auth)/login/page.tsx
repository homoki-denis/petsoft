import { AuthForm } from "@/components/auth";
import { H1 } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main>
      <H1 className="text-center">Log In</H1>
      <AuthForm type="login" />
      <p className="mt-6 text-sm text-zinc-500">
        No account yet? <Link href="/signup"> Sign Up</Link>
      </p>
    </main>
  );
}

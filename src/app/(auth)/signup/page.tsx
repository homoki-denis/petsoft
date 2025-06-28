import { AuthForm } from "@/components/auth";
import { H1 } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <main>
      <H1 className="text-center">Sign Up</H1>
      <AuthForm type="signup" />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account? <Link href="/login"> Log In</Link>
      </p>
    </main>
  );
}

import { ContentBlock, H1 } from "@/components/ui";

import { redirect } from "next/navigation";
import React from "react";
import SignOutButton from "./SignOutButton";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>
      <ContentBlock className="h-[500px] flex justify-center items-center flex-col space-y-4">
        <p>Logged in as {session.user?.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}

"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
  };
  return <Button onClick={handleSignOut}>Sign Out</Button>;
}

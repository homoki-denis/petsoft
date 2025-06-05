import { ContentBlock, H1 } from "@/components/ui";
import React from "react";

export default function AccountPage() {
  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>
      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}

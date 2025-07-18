import { H1 } from "@/components/ui";
import React from "react";

export default function Branding() {
  return (
    <section>
      <H1>
        Pet<span className="font-semibold">Soft</span>
      </H1>
      <p className="text-lg opacity-80">Manage your pet daycare with ease</p>
    </section>
  );
}

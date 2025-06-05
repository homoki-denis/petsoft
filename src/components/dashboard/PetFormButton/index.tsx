import { Button } from "@/components/ui";
import React from "react";

type PetFormButtonProps = {
  actionType: "add" | "edit";
};

export default function PetFormButton({ actionType }: PetFormButtonProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit a pet"}
    </Button>
  );
}

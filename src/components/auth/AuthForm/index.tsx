import { signUp } from "@/actions/actions";
import { Button, Input, Label } from "@/components/ui";
import { auth, signIn } from "@/lib/auth";
import { executeAction } from "@/lib/utils";

import { redirect } from "next/navigation";
import React from "react";

type AuthFormProps = {
  type: "login" | "signup";
};

export default async function AuthForm({ type }: AuthFormProps) {
  const session = await auth();

  if (session) redirect("/app/dashboard");

  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const type = formData.get("type");
        if (type === "login") {
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        } else {
          const res = await signUp(formData);
          if (res?.success) {
            redirect("/login");
          }
        }
      }}
      className="space-y-4"
    >
      <input type="hidden" name="type" value={type} />
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />
      </div>
      <Button>{type === "signup" ? "Sign Up" : "Log In"}</Button>
    </form>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { GitHub } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export function GitHubSignInButton() {
  const [isPending, setIsPending] = useState(false);

  const searchParams = useSearchParams();

  async function handleSignIn() {
    setIsPending(true);

    const callbackUrl = searchParams.get("callbackUrl") ?? routes.home;

    await signIn("github", { callbackUrl });
  }

  return (
    <Button onClick={handleSignIn} disabled={isPending} variant="secondary">
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <GitHub className="size-4" />
      )}
    </Button>
  );
}

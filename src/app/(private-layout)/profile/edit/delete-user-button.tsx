"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function DeleteUserButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      <span>Delete account</span>
    </Button>
  );
}

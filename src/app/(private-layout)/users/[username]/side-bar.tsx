"use client";

import Link from "next/link";
import { useOptimistic, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { accept, request, withdraw } from "@/features/connect";
import { cn } from "@/lib/utils";

export type Action = "connect" | "withdraw" | "edit" | "accept" | "message";

export function SideBar({
  id,
  action,
  connectionCount,
  image,
  username,
  name,
  bio,
  className,
}: {
  id: string;
  action: Action;
  connectionCount?: number;
  username?: string;
  image?: string;
  name?: string;
  bio?: string;
  className?: string;
}) {
  const [optimisticAction, toggleOptimisticAction] = useOptimistic(
    action,
    (_, action: Action) => action,
  );

  const [, startTransition] = useTransition();

  function handleConnect() {
    startTransition(async () => {
      toggleOptimisticAction("withdraw");
      await request(id);
    });
  }

  function handleWithdraw() {
    startTransition(async () => {
      toggleOptimisticAction("connect");
      await withdraw(id);
    });
  }

  function handleAccept() {
    startTransition(async () => {
      toggleOptimisticAction("message");
      await accept(id);
    });
  }

  return (
    <aside className={cn("rounded-lg border bg-card shadow-sm", className)}>
      <div className="relative border-b p-8 text-center">
        <Avatar className="mx-auto size-48 outline outline-offset-4 outline-border">
          <AvatarImage src={image} />

          <AvatarFallback>{username?.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>

        <h2 className="mt-8 text-2xl font-bold text-card-foreground">{name}</h2>

        <h1 className="text-lg text-muted-foreground">@{username}</h1>

        <p className="mt-2 text-sm text-muted-foreground">{bio}</p>

        <div className="absolute inset-x-0 -bottom-5">
          {optimisticAction === "edit" && (
            <Link
              href="/profile/edit"
              className={buttonVariants({ variant: "outline" })}
            >
              Edit profile
            </Link>
          )}

          {optimisticAction === "connect" && (
            <Button onClick={handleConnect} variant="outline">
              Connect
            </Button>
          )}

          {optimisticAction === "withdraw" && (
            <Button onClick={handleWithdraw} variant="outline">
              Withdraw
            </Button>
          )}

          {optimisticAction === "accept" && (
            <Button onClick={handleAccept} variant="outline">
              Accept
            </Button>
          )}

          {optimisticAction === "message" && (
            <Button variant="outline">Message</Button>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="text-center">
          <p className="text-2xl font-bold">{connectionCount}</p>
          <p className="text-sm text-muted-foreground">Connections</p>
        </div>
      </div>
    </aside>
  );
}

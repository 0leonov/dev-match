"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { accept, decline } from "@/features-1/connect";

interface Request {
  userId: string | null;
  userName: string | null;
  userUsername: string | null;
  userAvatar: string | null;
}

export function RequestList({ requests }: { requests: Request[] }) {
  const [optimisticRequests, deleteOptimisticRequest] = useOptimistic(
    requests,
    (state, userId: string | null) =>
      state.filter((request) => request.userId !== userId),
  );

  const [, startTransition] = useTransition();

  function handleAccept(userId: string) {
    startTransition(async () => {
      deleteOptimisticRequest(userId);
      await accept(userId);
    });
  }

  function handleDecline(userId: string) {
    startTransition(async () => {
      deleteOptimisticRequest(userId);
      await decline(userId);
    });
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">
        Connection Requests
      </h2>

      <ul className="mt-6">
        {optimisticRequests.map((request, index) => (
          <div key={request.userId}>
            {index > 0 && <Separator className="my-6" />}

            <li className="flex gap-4">
              <Link href={`/users/${request.userUsername}`}>
                <Avatar className="size-[5.75rem]">
                  <AvatarImage src={request.userAvatar!} alt="" />

                  <AvatarFallback>
                    {request.userUsername?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className="grow space-y-4">
                <div className="text-sm">
                  <h3 className="font-semibold">{request.userName}</h3>

                  <Link
                    href={`/users/${request.userUsername}`}
                    className="text-muted-foreground"
                  >
                    @{request.userUsername}
                  </Link>
                </div>

                <div className="grid grow grid-cols-2 gap-4">
                  <Button
                    size="sm"
                    onClick={() => handleDecline(request.userId!)}
                  >
                    <X className="size-4" />
                    <span className="ml-2 hidden sm:flex">Decline</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleAccept(request.userId!)}
                  >
                    <Check className="size-4" />
                    <span className="ml-2 hidden sm:flex">Accept</span>
                  </Button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
}

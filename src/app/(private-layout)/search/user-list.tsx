"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/db";
import { searchUsers } from "@/features/users/actions";

import { UserLoader } from "./user-loader";

export function UserList() {
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const username = searchParams.get("username") ?? undefined;
      const skillId = searchParams.get("skillId") ?? undefined;

      if (!username && !skillId) {
        setUsers([]);
        return;
      }

      setUsers(await searchUsers({ username, skillId }));
    });
  }, [searchParams]);

  return (
    <ul className="mt-8 space-y-4">
      {isPending
        ? [1, 2, 3, 4].map((key) => <UserLoader key={`loader-${key}`} />)
        : users.map(({ id, name, username, image }) => (
            <li key={id}>
              <div className="flex gap-4">
                <Link href={`/users/${username}`}>
                  <Avatar>
                    <AvatarImage src={image!} alt="" />

                    <AvatarFallback>
                      {username?.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold">{name}</h3>

                  <Link
                    href={`/users/${username}`}
                    className="text-muted-foreground"
                  >
                    @{username}
                  </Link>
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
}

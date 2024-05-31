import { Ellipsis, Flag, Trash2 } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatDateTime } from "@/lib/utils";

import { deletePost } from "./actions";
import type { Post } from "./types";

export function PostCard({
  id,
  content,
  createdAt,
  authorName,
  authorUsername,
  authorImage,
  isAdmin,
  className,
}: Post & { isAdmin?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[max-content,_1fr] gap-x-4 gap-y-2",
        className,
      )}
    >
      <Link href={`/users/${authorUsername}`}>
        <Avatar>
          <AvatarImage src={authorImage!} alt="" />

          <AvatarFallback>
            {authorUsername?.at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="text-sm">
        <div className="flex justify-between">
          <Link href={`/users/${authorUsername}`} className="flex gap-2">
            <h3 className="font-semibold">{authorName}</h3>

            <h3 className="grow text-muted-foreground">@{authorUsername}</h3>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="size-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Flag className="mr-2 size-4" />
                <span>Report</span>
              </DropdownMenuItem>

              {isAdmin && (
                <div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => deletePost(id)}>
                    <Trash2 className="mr-2 size-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="col-start-2 whitespace-break-spaces">{content}</p>

        <span className="col-start-2 text-sm text-muted-foreground">
          {formatDateTime(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
}

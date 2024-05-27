import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post } from "@/entities/post";
import { cn, formatDateTime } from "@/lib/utils";

export function PostCard({
  content,
  createdAt,
  authorName,
  authorUsername,
  authorImage,
  className,
}: Post & { className?: string }) {
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
        <h3 className="font-semibold">{authorName}</h3>

        <Link
          href={`/users/${authorUsername}`}
          className="text-muted-foreground"
        >
          @{authorUsername}
        </Link>
      </div>

      <p className="col-start-2 whitespace-break-spaces">{content}</p>

      <span className="col-start-2 text-sm text-muted-foreground">
        {formatDateTime(new Date(createdAt))}
      </span>
    </div>
  );
}

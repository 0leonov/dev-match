import type { Session } from "next-auth";

import { Separator } from "@/components/ui/separator";

import { PostCard } from "./post-card";
import type { Post } from "./types";

export function PostList({
  posts,
  handleDelete,
  session,
  className,
}: {
  posts: Post[];
  handleDelete?: (id: string) => void;
  session: Session;
  className?: string;
}) {
  return (
    <section className={className}>
      {posts.map((props, index) => (
        <div key={crypto.randomUUID()}>
          {index > 0 && <Separator className="my-6" />}

          <PostCard
            handleDelete={handleDelete}
            isEditable={
              !!session.user.roles?.includes("admin") ||
              session.user.username === props.authorUsername
            }
            className="px-2"
            {...props}
          />
        </div>
      ))}
    </section>
  );
}

import { Separator } from "@/components/ui/separator";
import type { Post } from "@/entities/post";

import { PostCard } from "./post-card";

export function PostList({
  posts,
  isAdmin,
  className,
}: {
  posts: Post[];
  isAdmin?: boolean;
  className?: string;
}) {
  return (
    <section className={className}>
      {posts.map((props, index) => (
        <div key={crypto.randomUUID()}>
          {index > 0 && <Separator className="my-6" />}

          <PostCard isAdmin={isAdmin} className="px-2" {...props} />
        </div>
      ))}
    </section>
  );
}

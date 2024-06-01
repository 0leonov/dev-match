"use client";

import type { Session } from "next-auth";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";

import * as actions from "./actions";
import { CreatePostForm } from "./create-post-form";
import type { CreatePostSchema } from "./create-post-schema";
import { PostCard } from "./post-card";
import type { Post } from "./types";

export function PostSection({
  posts,
  authorName,
  authorUsername,
  authorImage,
  session,
}: {
  posts: Post[];
  authorName: string | null;
  authorUsername: string | null;
  authorImage: string | null;
  session: Session;
}) {
  const [, startTransition] = useTransition();

  const [optimisticPosts, updateOptimisticPost] = useOptimistic(
    posts,
    (
      state,
      value:
        | { action: "add"; data: CreatePostSchema }
        | { action: "delete"; id: string },
    ) => {
      if (value.action === "add") {
        return [
          {
            id: crypto.randomUUID(),
            authorName,
            authorUsername,
            authorImage,
            createdAt: new Date(),
            ...value.data,
          },
          ...state,
        ];
      }

      return state.filter((post) => post.id !== value.id);
    },
  );

  function createPost(data: CreatePostSchema) {
    startTransition(async () => {
      updateOptimisticPost({ action: "add", data });

      const result = await actions.createPost(data);

      if (!result.success) {
        toast.error(result.error);
      }
    });
  }

  function deletePost(id: string) {
    startTransition(async () => {
      updateOptimisticPost({ action: "delete", id });

      await actions.deletePost(id);
    });
  }

  return (
    <>
      <CreatePostForm addPost={createPost} />

      <section className="mt-8">
        {optimisticPosts.map((props, index) => (
          <div key={crypto.randomUUID()}>
            {index > 0 && <Separator className="my-6" />}

            <PostCard
              handleDelete={deletePost}
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
    </>
  );
}

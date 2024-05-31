"use client";

import { useOptimistic } from "react";
import { toast } from "sonner";

import { createPost } from "./actions";
import { CreatePostForm } from "./create-post-form";
import type { CreatePostSchema } from "./create-post-schema";
import { PostList } from "./post-list";
import type { Post } from "./types";

export function PostSection({
  posts,
  authorName,
  authorUsername,
  authorImage,
  isAdmin,
}: {
  posts: Post[];
  authorName: string | null;
  authorUsername: string | null;
  authorImage: string | null;
  isAdmin: boolean;
}) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, { content }: CreatePostSchema) => [
      {
        id: crypto.randomUUID(),
        authorName,
        authorUsername,
        authorImage,
        content,
        createdAt: new Date(),
      },
      ...state,
    ],
  );

  async function addPost(data: CreatePostSchema) {
    addOptimisticPost(data);

    const result = await createPost(data);

    if (!result.success) {
      toast.error(result.error);
    }
  }

  return (
    <>
      <CreatePostForm addPost={addPost} />

      <PostList isAdmin={isAdmin} posts={optimisticPosts} className="mt-8" />
    </>
  );
}

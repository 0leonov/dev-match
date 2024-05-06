"use client";

import { useOptimistic } from "react";
import { toast } from "sonner";

import { PostList } from "@/components/post-list";
import type { CreatePostSchema, Post } from "@/entities/post";
import { CreatePostForm } from "@/features/create-post";
import { createPost } from "@/features/create-post/actions";

export default function PostSection({
  posts,
  authorName,
  authorUsername,
  authorImage,
}: {
  posts: Post[];
  authorName: string | null;
  authorUsername: string | null;
  authorImage: string | null;
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

      <PostList posts={optimisticPosts} className="mt-8" />
    </>
  );
}

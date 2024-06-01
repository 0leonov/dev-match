"use client";

import type { Session } from "next-auth";
import { useOptimistic } from "react";
import { toast } from "sonner";

import * as actions from "./actions";
import { CreatePostForm } from "./create-post-form";
import type { CreatePostSchema } from "./create-post-schema";
import { PostList } from "./post-list";
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

  async function createPost(data: CreatePostSchema) {
    updateOptimisticPost({ action: "add", data });

    const result = await actions.createPost(data);

    if (!result.success) {
      toast.error(result.error);
    }
  }

  async function deletePost(id: string) {
    updateOptimisticPost({ action: "delete", id });

    await actions.deletePost(id);
  }

  return (
    <>
      <CreatePostForm addPost={createPost} />

      <PostList
        posts={optimisticPosts}
        className="mt-8"
        handleDelete={deletePost}
        session={session}
      />
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  type CreatePostSchema,
  createPostSchema,
} from "@/entities/post/create-post-schema";

export function CreatePostForm({
  addPost,
  className,
}: {
  addPost: (data: CreatePostSchema) => void;
  className?: string;
}) {
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          form.reset();
          addPost(data);
        })}
        className={className}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="What's on your mind? 🤔" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full">Post</Button>
      </form>
    </Form>
  );
}

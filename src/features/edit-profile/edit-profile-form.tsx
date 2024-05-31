"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Gender } from "@/entities/user";
import {
  type UpdateUserSchema,
  updateUserSchema,
} from "@/entities/user/update-user-schema";

import { editProfile } from "./actions";

export function EditProfileForm({
  bio,
  gender,
  birthdate,
  name,
}: {
  bio: string | null;
  gender: Gender | null;
  birthdate: string | null;
  name: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name ?? "",
      bio: bio ?? "",
      gender: gender ?? "not_specified",
      birthdate: birthdate ?? "",
    },
  });

  function onSubmit(data: UpdateUserSchema) {
    startTransition(async () => {
      const result = await editProfile(data);

      if (result.success) {
        return;
      }

      toast.error(result.error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormDescription>
                    This is your public display name
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="not_specified">
                          Prefer not to say
                        </SelectItem>

                        <SelectItem value="male">Male</SelectItem>

                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      This is used to personalize your experience
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth date</FormLabel>

                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>

                  <FormDescription>
                    This is used to calculate your age
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button variant="secondary" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}

              <span>Save</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

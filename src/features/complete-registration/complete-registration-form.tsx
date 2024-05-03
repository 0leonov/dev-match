"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  CompleteRegistrationSchema,
  completeRegistrationSchema,
} from "@/entities/user/complete-registration-schema";
import { routes } from "@/lib/routes";

import { completeRegistration } from "./actions";

export function CompleteRegistrationForm() {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<CompleteRegistrationSchema>({
    resolver: zodResolver(completeRegistrationSchema),
    defaultValues: {
      username: "",
      bio: "",
      gender: "not_specified",
      birthdate: "",
    },
  });

  function onSubmit(data: CompleteRegistrationSchema) {
    startTransition(async () => {
      const result = await completeRegistration(data);

      router.replace(searchParams.get("callbackUrl") ?? routes.home);

      if (!result.success) {
        toast.error(result?.error);

        return;
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>

            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>

                  <FormDescription>
                    This is name to identify you on the platform
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

              <span>Create account</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

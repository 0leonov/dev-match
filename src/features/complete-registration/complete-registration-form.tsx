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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
            <CardTitle>Create you account</CardTitle>

            <CardDescription>
              Choose a unique username to complete your profile
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>

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

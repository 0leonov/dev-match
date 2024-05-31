"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
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
  type UpdateUserSchema,
  updateUserSchema,
} from "@/entities/user/update-user-schema";
import { useDebounce } from "@/lib/hooks";

import { checkUsernameAvailability, editProfile } from "./actions";

export function EditUsernameForm({
  username,
  title,
  description,
  action,
  redirect,
}: {
  username?: string | null;
  title?: string;
  description?: string;
  action?: string;
  redirect?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const [availabilityStatus, setAvailabilityStatus] = useState<
    "available" | "taken" | "checking" | null
  >(null);

  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: username ?? "",
    },
  });

  function onSubmit(data: UpdateUserSchema) {
    startTransition(async () => {
      const result = await editProfile(data);

      if (!result.success) {
        toast.error(result?.error);

        return;
      }

      if (redirect) {
        router.replace(searchParams.get("callbackUrl") ?? "/home");
      }
    });
  }

  const debouncedCheckAvailability = useDebounce((username: string) => {
    void checkUsernameAvailability(username).then((isAvailable) => {
      if (!form.formState.isValid) {
        setAvailabilityStatus(null);
        return;
      }

      if (isAvailable) {
        setAvailabilityStatus("available");

        form.clearErrors("username");
      } else {
        setAvailabilityStatus("taken");

        form.setError("username", {
          type: "taken",
          message: "Username is already taken",
        });
      }
    });
  });

  const isHeader = !!title || !!description;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          {isHeader && (
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}

              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}

          <CardContent className={isHeader ? "" : "mt-4"}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-10"
                        placeholder="username"
                        {...field}
                        onChange={(event) => {
                          if (!form.formState.isValid) {
                            setAvailabilityStatus(null);
                          } else {
                            setAvailabilityStatus("checking");

                            debouncedCheckAvailability(event.target.value);
                          }

                          field.onChange(event);
                        }}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {availabilityStatus === "checking" && (
                          <Loader2 className="size-4 animate-spin" />
                        )}

                        {availabilityStatus === "available" && (
                          <Check className="size-4" />
                        )}

                        {availabilityStatus === "taken" && (
                          <CircleX className="size-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  </FormControl>

                  <FormDescription>
                    This is name to identify you on the platform
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button variant="secondary" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}

              <span>{action}</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

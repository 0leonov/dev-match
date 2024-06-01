"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Skill } from "@/db";

import { editProfile } from "./actions";
import { type UpdateUserSchema, updateUserSchema } from "./update-user-schema";

export function EditSkillsForm({
  allSkills,
  defaultSkillIds,
}: {
  allSkills: Skill[];
  defaultSkillIds?: string[];
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      skills: defaultSkillIds ?? [],
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

  function toggleSkill(skillId: string) {
    const skills = form.getValues("skills");

    if (skills === undefined) {
      return [skillId];
    }

    if (skills.includes(skillId)) {
      form.setValue(
        "skills",
        skills.filter((id) => id !== skillId),
      );
    } else {
      form.setValue("skills", [...skills, skillId]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="mt-4">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Skills</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="h-fit min-h-10"
                        >
                          <ul className="flex flex-wrap gap-2">
                            {field.value?.map((id) => (
                              <li key={`badge-${id}`}>
                                <Badge>
                                  {
                                    allSkills.find((skill) => skill.id === id)
                                      ?.name
                                  }
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="max-w-48 p-0">
                      <Command>
                        <CommandInput placeholder="Search skill..." />

                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>

                          <CommandGroup>
                            {allSkills.map(({ id, name }) => (
                              <CommandItem
                                key={id}
                                onSelect={() => toggleSkill(id)}
                              >
                                {field.value?.find((skill) => skill === id) && (
                                  <Check className="mr-2 size-4" />
                                )}

                                <span>{name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

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

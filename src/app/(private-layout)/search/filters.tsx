"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skill } from "@/db";
import { useDebounce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Filters({ skills }: { skills: Skill[] }) {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const onUsernameChange = useDebounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(event.target.name, event.target.value);
      router.push(pathname + "?" + params.toString());
    },
  );

  function setSkill(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("skillId", value);
    router.push(pathname + "?" + params.toString());
  }

  return (
    <form className="flex flex-col gap-4 sm:flex-row">
      <Input
        onChange={onUsernameChange}
        name="username"
        placeholder="username"
        defaultValue={searchParams.get("username") ?? ""}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between sm:w-48"
          >
            {searchParams.get("skillId")
              ? skills.find((skill) => skill.id === searchParams.get("skillId"))
                  ?.name
              : "Select skill..."}

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-56 p-0">
          <Command>
            <CommandInput placeholder="Search skill..." />

            <CommandEmpty>No skill found.</CommandEmpty>

            <CommandList>
              <CommandGroup>
                {skills.map(({ id, name }) => (
                  <CommandItem
                    key={id}
                    value={id}
                    onSelect={(currentValue) => {
                      setSkill(
                        currentValue === searchParams.get("skillId")
                          ? ""
                          : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        searchParams.get("skillId") !== id && "opacity-0",
                      )}
                    />
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </form>
  );
}

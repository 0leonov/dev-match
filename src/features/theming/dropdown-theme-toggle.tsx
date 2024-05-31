"use client";

import { LaptopMinimal, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeString } from "@/lib/utils";

const themes = [
  {
    icon: <Sun className="mr-2 size-4" />,
    theme: "light",
  },
  {
    icon: <Moon className="mr-2 size-4" />,
    theme: "dark",
  },
  {
    icon: <LaptopMinimal className="mr-2 size-4" />,
    theme: "system",
  },
];

export function DropdownThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette className="mr-2 size-4" />

        <span>Choose theme</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {themes.map(({ icon, theme }) => (
            <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
              {icon}
              <span>{capitalizeString(theme)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

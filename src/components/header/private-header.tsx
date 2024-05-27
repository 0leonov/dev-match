import { AlignJustify, Bell, LogOut, User } from "lucide-react";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownThemeToggle } from "@/features/theming";
import { routes } from "@/lib/routes";

import { HomeLink } from "./home-link";
import { NavBar } from "./nav-bar";

export async function PrivateHeader() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 py-4 backdrop-blur">
      <div className="container grid grid-cols-2 sm:grid-cols-[1fr,_max-content,_1fr]">
        <div className="flex items-center">
          <HomeLink href={routes.home} />
        </div>

        <NavBar username={session.user.username!} className="hidden sm:block" />

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-11 px-1 text-muted-foreground transition-colors hover:text-foreground">
              <AlignJustify />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <div className="sm:hidden">
                <DropdownMenuItem asChild>
                  <Link href={`/users/${session.user.username}`}>
                    <User className="mr-2 size-4" />

                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/notification`}>
                    <Bell className="mr-2 size-4" />

                    <span>Notification</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </div>

              <DropdownThemeToggle />

              <DropdownMenuSeparator />

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: routes.welcome });
                }}
              >
                <DropdownMenuItem asChild>
                  <button className="w-full">
                    <LogOut className="mr-2 size-4" />

                    <span>Log out</span>
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

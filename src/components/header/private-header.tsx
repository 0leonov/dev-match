import {
  AlignJustify,
  Bell,
  FolderKey,
  LogOut,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownThemeToggle } from "@/features/theming/dropdown-theme-toggle";

import { HomeLink } from "./home-link";
import { NavBar } from "./nav-bar";

export async function PrivateHeader() {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return (
    <header className="sticky top-0 z-20 py-4 backdrop-blur">
      <div className="container grid grid-cols-2 sm:grid-cols-[1fr,_max-content,_1fr]">
        <div className="flex items-center">
          <HomeLink href="/home" />
        </div>

        <NavBar username={session.user.username!} className="hidden sm:block" />

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-11 px-1 text-muted-foreground transition-colors hover:text-foreground">
              <AlignJustify />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup className="sm:hidden">
                <DropdownMenuItem asChild>
                  <Link href={`/search`}>
                    <Search className="mr-2 size-4" />

                    <span>Search</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/notification`}>
                    <Bell className="mr-2 size-4" />

                    <span>Notification</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/users/${session.user.username}`}>
                    <User className="mr-2 size-4" />

                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </DropdownMenuGroup>

              <DropdownThemeToggle />

              <DropdownMenuSeparator />

              {session.user.roles?.includes("admin") && (
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/edit-skills">
                      <FolderKey className="mr-2 size-4" />
                      <span>Edit skills</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
              )}

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
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

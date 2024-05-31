import Link from "next/link";

import { auth } from "@/auth";
import { GitHub } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/features-1/theming";

import { HomeLink } from "./home-link";

export async function PublicHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-20 py-4 backdrop-blur">
      <div className="container flex items-center justify-between">
        <HomeLink href={session ? "/home" : "/"} />

        <div className="flex gap-4">
          <Link
            href="https://github.com/0leonov/devmatch"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <GitHub className="size-4" />
          </Link>

          <ThemeToggle variant="ghost" />
        </div>
      </div>
    </header>
  );
}

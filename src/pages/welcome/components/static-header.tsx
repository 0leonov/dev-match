import { ChevronRight } from "lucide-react";
import Link from "next/link";

import Logo from "@/shared/assets/logo.svg";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { buttonVariants } from "@/shared/components/ui/button";
import { pagePaths } from "@/utils/page-paths";

export function StaticHeader() {
  return (
    <header className="container py-8 flex items-start justify-between">
      <Logo className="h-10 sm:h-16 fill-foreground" />

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Link
          href={pagePaths.login}
          className={buttonVariants({ variant: "ghost" })}
        >
          <span>Login</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </header>
  );
}

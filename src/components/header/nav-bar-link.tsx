import Link from "next/link";

import { cn } from "@/lib/utils";

export function NavBarLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center rounded-md px-8 transition-all hover:bg-secondary",
        isActive ? "text-secondary-foreground" : "text-secondary-foreground/60",
      )}
    >
      {children}
    </Link>
  );
}

"use client";

import { User } from "lucide-react";
import { usePathname } from "next/navigation";

import { routes } from "@/lib/routes";

import { NavBarLink } from "./nav-bar-link";

export function NavBar({
  username,
  className,
}: {
  username: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex gap-4">
        <li>
          <NavBarLink
            href={`/users/${username}`}
            isActive={pathname.startsWith(routes.profile)}
          >
            <User />
          </NavBarLink>
        </li>
      </ul>
    </nav>
  );
}

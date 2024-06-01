"use client";

import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

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
            href={"/search"}
            isActive={pathname.startsWith(`/search`)}
          >
            <Search />
          </NavBarLink>
        </li>

        <li>
          <NavBarLink
            href={"/notifications"}
            isActive={pathname.startsWith(`/notifications`)}
          >
            <Bell />
          </NavBarLink>
        </li>

        <li>
          <NavBarLink
            href={`/users/${username}`}
            isActive={pathname.startsWith(`/users/${username}`)}
          >
            <User />
          </NavBarLink>
        </li>
      </ul>
    </nav>
  );
}

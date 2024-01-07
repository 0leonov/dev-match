import Link from "next/link";
import React from "react";

import GitHubLogo from "@/shared/assets/github.svg";
import Logo from "@/shared/assets/logo.svg";
import { pagePaths } from "@/utils/page-paths";

const content = [
  {
    title: "Company",
    links: [
      {
        title: "About",
        href: pagePaths.aboutUs,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms of Service",
        href: pagePaths.terms,
      },
      {
        title: "Privacy Policy",
        href: pagePaths.terms,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="container py-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-32">
        {content.map(({ title, links }) => {
          return (
            <div key={title}>
              <h2 className="text-foreground">{title}</h2>

              <ul className="mt-4 space-y-2">
                {links.map((link) => {
                  return (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground underline-offset-4 hover:underline"
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-16 flex gap-2 justify-between flex-col sm:flex-row sm:items-end">
        <div className="flex items-center gap-4">
          <Logo className="h-6 fill-foreground" />

          <div className="text-sm text-muted-foreground">
            <p>Copyright © 2024 Artyom Leonov</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        <Link href="https://github.com/0leonov" target="_blank">
          <GitHubLogo className="h-6 fill-muted-foreground hover:fill-foreground" />
        </Link>
      </div>
    </footer>
  );
}

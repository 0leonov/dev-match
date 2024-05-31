import Link from "next/link";

import { footerContent } from "../lib/footer-content";

export function FooterNav() {
  return (
    <footer className="container py-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-32">
        {footerContent.map(({ title, links }) => (
          <div key={title}>
            <h2>{title}</h2>

            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

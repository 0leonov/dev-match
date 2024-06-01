import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container space-y-2 py-16 text-center">
      <h2 className="text-4xl font-extrabold tracking-tight">
        Sorry, this page is not available
      </h2>

      <p className="text-lg text-muted-foreground">
        The link you followed may be broken, or the page may have been removed.
      </p>

      <Link
        href="/home"
        className={buttonVariants({ variant: "link", size: "lg" })}
      >
        Go back
      </Link>
    </main>
  );
}

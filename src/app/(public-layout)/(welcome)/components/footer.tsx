import { DevMatch } from "@/components/icons/devmatch";

export function Footer() {
  return (
    <footer className="container py-8">
      <div className="flex items-center gap-4">
        <DevMatch className="h-8" />

        <div className="text-sm">
          <p>Copyright © 2024 Artyom Leonov</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

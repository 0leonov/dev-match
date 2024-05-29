"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

export function Filters() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const onChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(event.target.name, event.target.value);
    router.push(pathname + "?" + params.toString());
  });

  return (
    <form>
      <Input
        onChange={onChange}
        name="username"
        placeholder="username"
        defaultValue={searchParams.get("username") ?? ""}
      />
    </form>
  );
}

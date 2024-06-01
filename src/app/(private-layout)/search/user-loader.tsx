import { Skeleton } from "@/components/ui/skeleton";

export function UserLoader() {
  return (
    <div className="flex gap-4">
      <Skeleton className="size-10 rounded-full" />

      <div className="space-y-2">
        <Skeleton className="h-[14px] w-48" />

        <Skeleton className="h-[14px] w-48" />
      </div>
    </div>
  );
}

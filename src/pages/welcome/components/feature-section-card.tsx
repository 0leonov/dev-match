import { cn } from "@/shared/lib/utils";

export function FeatureSectionCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-12 flex flex-col justify-between items-center bg-secondary text-secondary-foreground rounded-xl text-center",
        className,
      )}
    >
      <h2 className="tracking-tight text-4xl sm:text-5xl">{title}</h2>
      <p className="mt-8 text-muted-foreground">{description}</p>
    </div>
  );
}

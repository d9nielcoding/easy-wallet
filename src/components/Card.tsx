import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground hover:bg-card-hover flex min-h-[74px] cursor-pointer items-center justify-center gap-1 rounded-2xl text-sm font-bold transition-colors duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

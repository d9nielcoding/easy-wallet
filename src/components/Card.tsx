import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
  onClick,
  disabled = false,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground hover:bg-card-hover flex min-h-[74px] cursor-pointer items-center justify-center gap-1 rounded-2xl text-sm font-bold transition-colors duration-300",
        disabled && "hover:bg-card cursor-not-allowed opacity-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

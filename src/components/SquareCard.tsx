import { cn } from "@/lib/utils";
import Card from "./Card";

export default function SquareCard({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Card
      className={cn(
        "aspect-square w-full max-w-[121px] min-w-[64px] flex-col gap-2",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}

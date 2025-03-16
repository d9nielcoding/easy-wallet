import { cn } from "@/lib/utils";
import Card from "./Card";

export default function SquareCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "aspect-square w-full max-w-[121px] min-w-[64px] flex-col",
        className
      )}
    >
      {children}
    </Card>
  );
}

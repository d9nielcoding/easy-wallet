import { cn } from "@/lib/utils";
import Card from "./Card";

export default function ListCard({
  className,
  children,
  disabled = false,
}: {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <Card className={cn("w-full p-4", className)} disabled={disabled}>
      {children}
    </Card>
  );
}

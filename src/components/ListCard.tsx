import { cn } from "@/lib/utils";
import Card from "./Card";

export default function ListCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <Card className={cn("w-full p-4", className)}>{children}</Card>;
}

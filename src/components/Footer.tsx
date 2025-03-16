"use client";
import { cn } from "@/lib/utils";
import { History, Home, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  return (
    <div className="bg-card text-muted-foreground fixed bottom-0 flex h-[74px] w-full justify-center">
      <div className="flex w-full max-w-[540px] items-center justify-around px-4">
        <FooterTab href="/" icon={<Home size={24} />} />
        <FooterTab href="/history" icon={<History size={24} />} />
        <RefreshCw size={24} className="cursor-default opacity-50" />
        <Search size={24} className="cursor-default opacity-50" />
      </div>
    </div>
  );
}

const FooterTab = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn("text-foreground", {
        "text-primary": pathname === href,
      })}
    >
      {icon}
    </Link>
  );
};

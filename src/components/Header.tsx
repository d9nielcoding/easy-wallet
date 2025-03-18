"use client";
import { ChainImages } from "@/constants/images";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { previewAddress } from "@/lib/utils";
import { IAccount } from "@/types/bo";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Logo from "/public/easy-wallet.png";

export default function Header() {
  const [account] = useLocalStorage<IAccount | null>("account", null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyAddress = (target: string) => {
    if (target === "") {
      toast.error("Failed to copy!");
      return;
    }
    navigator.clipboard.writeText(target);
    toast.success("Copied!");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip>
      <div className="border-secondary bg-background fixed flex h-16 w-full justify-center border-b px-12 py-6">
        <div className="border-secondary flex w-full max-w-[540px] items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Logo" width={24} height={24} />
              <h1 className="text-primary text-2xl font-bold">Easy Wallet</h1>
            </div>
          </Link>
          <span className="mr-0 flex flex-col gap-1 text-sm opacity-70">
            <span className="text-foreground self-end font-bold">
              @{account?.displayName}
            </span>
            <TooltipTrigger>
              <div className="flex w-full cursor-pointer items-center justify-center gap-2">
                {account?.wallet.chain && (
                  <Image
                    src={ChainImages[account.wallet.chain]}
                    alt={account.wallet.chain}
                    className="h-4 w-4"
                    width={16}
                    height={16}
                  />
                )}
                <p className="text-muted-foreground text-sm">
                  {previewAddress(account?.wallet.address || "")}
                </p>
                <Copy
                  size={16}
                  color="var(--primary)"
                  onClick={() =>
                    handleCopyAddress(account?.wallet.address || "")
                  }
                />
              </div>
            </TooltipTrigger>
          </span>
        </div>
      </div>
      <TooltipContent>
        <p>Copy Address</p>
      </TooltipContent>
    </Tooltip>
  );
}

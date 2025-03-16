"use client";
import { ChainImages } from "@/constants/images";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { previewAddress } from "@/lib/utils";
import { IAccount } from "@/types/bo";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    <div className="border-secondary bg-background fixed flex h-[59px] w-full justify-center border-b p-4">
      <div className="border-secondary flex w-full max-w-[540px] items-center justify-between">
        <span className="text-lg font-semibold">@{account?.displayName}</span>
        <span className="text-sm opacity-70">
          <div className="flex w-full items-center justify-center gap-2">
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
              onClick={() => handleCopyAddress(account?.wallet.address || "")}
            />
          </div>
        </span>
      </div>
    </div>
  );
}

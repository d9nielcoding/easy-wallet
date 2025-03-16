"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWallet() {
  const [wallet, setWallet] = useState<{
    address: string;
    mnemonic: string;
  } | null>(null);
  const router = useRouter();

  const generateWallet = () => {
    const newWallet = Wallet.createRandom();
    setWallet({
      address: newWallet.address,
      mnemonic: newWallet.mnemonic?.phrase || "助記詞生成失敗",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Create New Wallet</h1>
      <Button onClick={generateWallet} className="mb-4">
        產生新錢包
      </Button>
      {wallet && (
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-400">地址：</p>
          <p className="text-lg break-all">{wallet.address}</p>
          <p className="mt-4 text-sm text-gray-400">助記詞：</p>
          <p className="text-lg break-words">{wallet.mnemonic}</p>
        </div>
      )}
      <Button onClick={() => router.push("/")} className="mt-6">
        回到首頁
      </Button>
    </div>
  );
}

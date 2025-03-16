"use client";

import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Chain, IAccount, IWallet } from "@/types/bo";
import { Wallet } from "ethers";
import { Dices } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../layout";

export default function CreateWallet() {
  // const { account, setAccount } = useGlobalContext();
  const [account, setAccount] = useLocalStorage<IAccount | null>(
    "account",
    null
  );
  const [displayName, setDisplayName] = useState("");
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const router = useRouter();

  const generateEthereumWallet = () => {
    const newWallet = Wallet.createRandom();
    setWallet({
      address: newWallet.address,
      mnemonic:
        newWallet.mnemonic?.phrase || "Failed to generate recovery phrase",
      chain: Chain.ETHEREUM,
    });
  };

  const handleNext = () => {
    if (displayName === "") {
      toast.error("Please enter a name");
      return;
    }
    if (wallet === null) {
      toast.error("Please generate a wallet");
      return;
    }

    setAccount({
      displayName,
      wallet: { ...wallet },
    });
    console.log("account", account);

    router.push("/");
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-start gap-6 p-16 text-white">
      <h1 className="text-primary self-center text-4xl font-black">
        Create Account
      </h1>
      <div id="account-name" className="flex w-full flex-col gap-2">
        <Title title="Account Name" />
        <Input
          placeholder="Enter your name here"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="text-foreground bg-card mb-4 w-full rounded-lg border-none px-4 py-6"
        />
      </div>
      <div id="wallet-address" className="flex w-full flex-col gap-2">
        <Title title="Generate Wallet" />
        {wallet === null && (
          <Button
            onClick={generateEthereumWallet}
            size="lg"
            className="flex w-full items-center gap-2 text-lg font-bold"
          >
            <Dices />
            Generate
          </Button>
        )}
        {wallet && (
          <div className="bg-card flex w-full max-w-md flex-col gap-4 rounded-lg p-4 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-xl font-bold">Address</h2>
              <div className="flex items-center gap-4">
                <p className="mx-auto mt-2 w-2/3 break-all">{wallet.address}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-xl font-bold">
                Recovery Phrase
              </h2>
              <p className="font-bold break-words">{wallet.mnemonic}</p>
            </div>
          </div>
        )}
        {wallet !== null && (
          <Button
            onClick={handleNext}
            className={cn(
              "mt-6",
              displayName === "" ? "cursor-default opacity-50" : "opacity-100"
            )}
          >
            Ok! Let's go!
          </Button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

CreateWallet.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

"use client";

import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { encryptMnemonic } from "@/lib/encrypt";
import { cn } from "@/lib/utils";
import { Chain, IAccount, IWallet } from "@/types/bo";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ImportWallet() {
  const [account, setAccount] = useLocalStorage<IAccount | null>(
    "account",
    null
  );
  const [pwdInStorage, setPwdInStorage] = useSessionStorage("pwd", "");

  const [displayName, setDisplayName] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [ableToCreateWallet, setAbleToCreateWallet] = useState(false);
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (pwd.length === 0 || pwdConfirm.length === 0) {
      setPwdNotMatch(false);
      return;
    }

    if (pwd !== pwdConfirm) {
      setPwdNotMatch(true);
    } else {
      setPwdNotMatch(false);
    }
  }, [pwd, pwdConfirm]);

  useEffect(() => {
    if (pwdNotMatch || displayName === "") {
      setAbleToCreateWallet(false);
    } else {
      setAbleToCreateWallet(true);
    }
  }, [pwdNotMatch, displayName]);

  const handleValidate = () => {
    const wallet = ethers.Wallet.fromPhrase(recoveryPhrase);

    if (!wallet.mnemonic) {
      toast.error("Failed to generate recovery phrase");
      return;
    }

    setWallet({
      address: wallet.address,
      mnemonic: wallet.mnemonic?.phrase,
      mnkey: encryptMnemonic(wallet.mnemonic?.phrase, pwd),
      chain: Chain.ETHEREUM,
    });
  };

  const handleNext = () => {
    if (displayName === "") {
      toast.error("Please enter a name");
      return;
    }
    if (!pwd || !pwdConfirm || pwdNotMatch) {
      toast.error("Please enter and confirm your password");
      return;
    }
    if (wallet === null) {
      toast.error("Please generate a wallet");
      return;
    }
    if (!wallet.mnemonic) {
      toast.error("Failed to generate recovery phrase");
      return;
    }
    const mnkey = encryptMnemonic(wallet.mnemonic, pwd);
    if (!mnkey) {
      toast.error("Failed to generate recovery phrase");
      return;
    }
    wallet.mnkey = mnkey;
    delete wallet.mnemonic;

    setAccount({
      displayName,
      wallet: { ...wallet },
    });
    setPwdInStorage(pwd);
    console.log("account", account);
    console.log("pwdInStorage", pwdInStorage);

    router.push("/");
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-start gap-6 p-16 text-white">
      <h1 className="text-primary self-center text-4xl font-black">
        Import Recovery Phrase
      </h1>
      <div id="account-name" className="flex w-full flex-col gap-2">
        <Title title="Account Name" />
        <Input
          placeholder="Enter your name here"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="text-foreground bg-card w-full rounded-lg border-none px-4 py-6"
        />
      </div>
      <div id="password" className="flex w-full flex-col gap-2">
        <Title title="Password" />
        <PasswordInput
          placeholder="Enter your password here"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="text-foreground bg-card w-full rounded-lg border-none px-4 py-6"
        />
        <PasswordInput
          placeholder="Enter your password again"
          value={pwdConfirm}
          aria-invalid={pwdNotMatch}
          onChange={(e) => setPwdConfirm(e.target.value)}
          className="text-foreground bg-card w-full rounded-lg border-none px-4 py-6"
        />
      </div>
      <div id="wallet-address" className="flex w-full flex-col gap-2">
        <Title title="Generate Wallet" />
        {wallet === null && (
          <>
            <Input
              placeholder="Enter your recovery phrase here"
              value={recoveryPhrase}
              onChange={(e) => setRecoveryPhrase(e.target.value)}
            />
            <Button
              className="mt-6"
              disabled={recoveryPhrase.length === 0}
              onClick={handleValidate}
            >
              Validate
            </Button>
          </>
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

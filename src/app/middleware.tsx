"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAccount } from "@/types/bo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function ProviderLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </GlobalProvider>
  );
}

export function Middleware() {
  // const { account } = useGlobalContext();
  const [account] = useLocalStorage<IAccount | null>("account", null);
  const router = useRouter();

  useEffect(() => {
    if (account === null) {
      router.push("/createWallet");
    }
  }, [account, router]);

  return <></>;
}

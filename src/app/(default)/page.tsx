"use client";

import ListCard from "@/components/ListCard";
import SquareCard from "@/components/SquareCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCopy } from "@/hooks/useCopy";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAccount } from "@/types/bo";
import { Copy, CreditCard, QrCode, RefreshCw, Send } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

import { ToastContainer } from "react-toastify";

const tokens = [
  { name: "Solana", symbol: "SOL", balance: 0, usdValue: 0, icon: "🔵" },
  { name: "Ethereum", symbol: "ETH", balance: 0, usdValue: 0, icon: "⚫" },
  { name: "Sui", symbol: "SUI", balance: 0, usdValue: 0, icon: "🔵" },
  { name: "Polygon", symbol: "MATIC", balance: 0, usdValue: 0, icon: "🟣" },
];

export default function HomePage() {
  const [balance, setBalance] = useState(0);
  const [account] = useLocalStorage<IAccount | null>("account", null);
  const { handleCopyAddress } = useCopy();
  const openReceiveModal = () => {
    console.log("openReceiveModal");
  };

  return (
    <Dialog>
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        {/* Balance Display */}
        <div className="py-6 text-center">
          <h1 className="text-4xl font-bold">${balance.toFixed(2)}</h1>
          <p className="text-muted-foreground text-sm">
            +${balance.toFixed(2)} +0.00%
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full justify-center gap-2">
          <DialogTrigger asChild>
            <SquareCard onClick={openReceiveModal}>
              <QrCode size={24} color="var(--primary)" />
              Receive
            </SquareCard>
          </DialogTrigger>
          <SquareCard>
            <Send size={24} color="var(--primary)" />
            Send
          </SquareCard>
          <SquareCard>
            <RefreshCw size={24} color="var(--primary)" />
            Swap
          </SquareCard>
          <SquareCard>
            <CreditCard size={24} color="var(--primary)" />
            Buy
          </SquareCard>
        </div>

        {/* Token List */}
        <h1 className="mt-4 ml-2 text-xl font-semibold">Tokens</h1>
        <div className="mt-4 space-y-2">
          {tokens.map((token, index) => (
            <ListCard key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{token.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold">{token.name}</h3>
                  <p className="text-muted-foreground text-xs">
                    {token.balance} {token.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ${token.usdValue.toFixed(2)}
                </p>
                <p className="text-accent-foreground text-xs">+0.00%</p>
              </div>
            </ListCard>
          ))}
        </div>
        <ToastContainer />
      </div>
      <DialogContent className="flex w-2/3 flex-col items-center justify-center gap-4 border-none">
        <DialogTitle>
          <h2 className="text-xl font-semibold">Scan to get address</h2>
        </DialogTitle>
        {account?.wallet.address && (
          <>
            <QRCodeSVG value={account?.wallet.address} size={256} />
            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="text-foreground text-sm">
                {account?.wallet.address}
              </p>
              <Copy
                size={16}
                color="var(--primary)"
                className="cursor-pointer"
                onClick={() => handleCopyAddress(account?.wallet.address || "")}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

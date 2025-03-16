"use client";

import ListCard from "@/components/ListCard";
import SquareCard from "@/components/SquareCard";
import { CreditCard, QrCode, RefreshCw, Send } from "lucide-react";
import { useState } from "react";

const tokens = [
  { name: "Solana", symbol: "SOL", balance: 0, usdValue: 0, icon: "🔵" },
  { name: "Ethereum", symbol: "ETH", balance: 0, usdValue: 0, icon: "⚫" },
  { name: "Sui", symbol: "SUI", balance: 0, usdValue: 0, icon: "🔵" },
  { name: "Polygon", symbol: "MATIC", balance: 0, usdValue: 0, icon: "🟣" },
];

export default function HomePage() {
  const [balance, setBalance] = useState(0);

  return (
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
        <SquareCard>
          <QrCode size={24} color="var(--primary)" />
          Receive
        </SquareCard>
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
    </div>
  );
}

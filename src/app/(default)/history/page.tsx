"use client";
import ListCard from "@/components/ListCard";
import { useWallet } from "@/hooks/useWallet";
import { ITransaction, Token } from "@/types/bo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function History() {
  const { getTransactions } = useWallet();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const ethTransactions = await getTransactions(Token.ETH);
        const erc20Transactions = await getTransactions(Token.USDT);
        const allTransactions = [...ethTransactions, ...erc20Transactions].sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );
        setTransactions(allTransactions);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to fetch transactions: ${error}`);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      {transactions.length === 0 && (
        <div className="flex h-screen items-center justify-center pb-32">
          <p className="text-foreground/80 text-2xl font-bold">
            No transactions found
          </p>
        </div>
      )}
      {transactions.map((transaction) => (
        <ListCard key={transaction.hash}>
          <div>
            <p>{transaction.hash}</p>
            <p>{transaction.from}</p>
            <p>{transaction.to}</p>
            <p>{transaction.value}</p>
            <p>{transaction.timestamp}</p>
            <p>{transaction.tokenName ?? Token.ETH}</p>
            <p>{transaction.tokenSymbol ?? Token.ETH}</p>
          </div>
        </ListCard>
      ))}
    </div>
  );
}

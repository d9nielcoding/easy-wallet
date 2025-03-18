import erc20Abi from "@/constants/erc20Abi.json";
import { tokenAddresses } from "@/constants/token";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { decryptMnemonic } from "@/lib/encrypt";
import { Erc20Token, IAccount, ITransaction, Token } from "@/types/bo";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useWallet() {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [pwd] = useSessionStorage("pwd", "");
  const [account] = useLocalStorage<IAccount | null>("account", null);
  const provider = useMemo(
    () => new ethers.JsonRpcProvider("https://eth.llamarpc.com"),
    []
  );

  const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

  useEffect(() => {
    if (account === null) {
      console.log("Error: Account not found");
      return;
    }
    if (!account.wallet) {
      console.log("Error: Wallet not found");
      return;
    }
    if (!account.wallet.mnkey) {
      console.log("Error: Mnemonic not found");
      return;
    }
    if (!account.wallet.address) {
      console.log("Error: Address not found");
      return;
    }
    if (!pwd) {
      console.log("Error: Password not found");
      return;
    }

    const mnemonic = decryptMnemonic(account.wallet.mnkey, pwd);
    if (!mnemonic) {
      console.log("Error: Failed to decrypt mnemonic");
      return;
    }

    const hdwallet = ethers.Wallet.fromPhrase(mnemonic);
    setWallet(new ethers.Wallet(hdwallet.privateKey, provider));
  }, []);

  const getBalance = useCallback(
    async (token: Token): Promise<number | null> => {
      if (!account) {
        console.log("Error: Account not found");
        return null;
      }

      if (token === Token.ETH) {
        const balance = await provider.getBalance(account.wallet.address);
        return Number(ethers.formatEther(balance));
      } else {
        const erc20Token = token as unknown as Erc20Token;
        if (!tokenAddresses[erc20Token]) {
          console.log(token, "Error: Token address not found");
          return null;
        }
        const erc20Contract = new ethers.Contract(
          tokenAddresses[erc20Token],
          erc20Abi,
          provider
        );
        const balance = await erc20Contract.balanceOf(account.wallet.address);
        const decimals = await erc20Contract.decimals();
        return Number(ethers.formatUnits(balance, decimals));
      }
    },
    [account, provider]
  );

  const sendEth = async (to: string, amountEth: string) => {
    if (!wallet) {
      console.log("Error: Wallet not found");
      return;
    }

    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amountEth), // 轉換 ETH 為 Wei
    });

    console.log("Transaction sending...", tx.hash);
    await tx.wait(); // 等待確認
    console.log("Transaction success:", tx.hash);
  };

  const sendErc20 = async (
    erc20Token: Erc20Token,
    to: string,
    amount: string
  ) => {
    console.log("sendErc20", erc20Token, to, amount);
    if (!wallet) {
      console.log("Error: Wallet not found");
      return;
    }

    const erc20Contract = new ethers.Contract(
      tokenAddresses[erc20Token],
      erc20Abi,
      wallet
    );

    const decimals = await erc20Contract.decimals();
    const amountInUnits = ethers.parseUnits(amount, decimals);

    const tx = await erc20Contract.transfer(to, amountInUnits);
    console.log("Transaction sending...", tx.hash);
    await tx.wait();
    console.log("Transaction success:", tx.hash);
  };

  const getTransactions = useCallback(
    async (token: Token): Promise<ITransaction[]> => {
      if (!account?.wallet.address) {
        console.log("Error: Wallet not found");
        return [];
      }
      const action = token === Token.ETH ? "txlist" : "tokentx";
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=${action}&address=${account.wallet?.address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`
      );
      const data = await response.json();
      return data.result as ITransaction[];
    },
    [account, etherscanApiKey]
  );

  return { getBalance, sendEth, sendErc20, wallet, getTransactions };
}

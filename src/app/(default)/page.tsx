"use client";

import ListCard from "@/components/ListCard";
import SquareCard from "@/components/SquareCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TokenImages } from "@/constants/images";
import { tokenNames } from "@/constants/token";
import { useCopy } from "@/hooks/useCopy";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useWallet } from "@/hooks/useWallet";
import { getTokenPrice } from "@/lib/price";
import { Currency, Erc20Token, IAccount, IToken, Token } from "@/types/bo";
import { Copy, CreditCard, QrCode, RefreshCw, Send } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

const tokenSettings: Record<Token, IToken> = {
  [Token.ETH]: {
    name: Token.ETH,
    symbol: "ETH",
    balance: 0,
    usdValue: 0,
    icon: TokenImages[Token.ETH],
    disabled: false,
  },
  [Token.USDT]: {
    name: Token.USDT,
    symbol: "USDT",
    balance: 0,
    usdValue: 0,
    icon: TokenImages[Token.USDT],
    disabled: false,
  },
  [Token.USDC]: {
    name: Token.USDC,
    symbol: "USDC",
    balance: 0,
    usdValue: 0,
    icon: TokenImages[Token.USDC],
    disabled: true,
  },
};

export default function HomePage() {
  const [totalValue, setTotalValue] = useState(0);
  const [account] = useLocalStorage<IAccount | null>("account", null);
  const [tokens, setTokens] = useState<Record<Token, IToken>>(tokenSettings);
  const { handleCopyAddress } = useCopy();
  const { getBalance, sendEth, sendErc20 } = useWallet();

  const [sendTokenDialogStep, setSendTokenDialogStep] = useState<
    "selectToken" | "enterAmount" | "finished"
  >("selectToken");

  const [selectedToken, setSelectedToken] = useState<Token>(Token.ETH);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendTokenResponseMessage, setSendTokenResponseMessage] =
    useState<string>("");

  const [openSendTokenDialog, setOpenSendTokenDialog] = useState(false);
  useEffect(() => {
    if (openSendTokenDialog) {
      setSendTokenDialogStep("selectToken");
      setSendTokenResponseMessage("");
      setSelectedToken(Token.ETH);
      setRecipientAddress("");
      setSendAmount(0);
    }
  }, [openSendTokenDialog]);

  const handleSelectToken = (token: IToken) => {
    setSelectedToken(token.name);
    setSendTokenDialogStep("enterAmount");
  };

  const handleSendToken = async () => {
    try {
      if (selectedToken === Token.ETH) {
        await sendEth(recipientAddress, sendAmount.toString());
      } else {
        await sendErc20(
          selectedToken as unknown as Erc20Token,
          recipientAddress,
          sendAmount.toString()
        );
      }
      setSendTokenResponseMessage(
        `Transaction ${selectedToken} sent successfully, please check the transaction in the history page later.`
      );
    } catch (error) {
      console.error(`[Transaction] ${error}`);
      setSendTokenResponseMessage(`Transaction Error`);
    } finally {
      setSendTokenDialogStep("finished");
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!account) {
      return;
    }
    const fetchBalanceAndPrice = async () => {
      const ethBalance = (await getBalance(Token.ETH)) ?? 0;
      const ethPrice = await getTokenPrice(tokenNames[Token.ETH], Currency.USD);

      const usdtBalance = (await getBalance(Token.USDT)) ?? 0;
      const usdtPrice = await getTokenPrice(
        tokenNames[Token.USDT],
        Currency.USD
      );

      setTokens((prev) => ({
        ...prev,
        [Token.ETH]: {
          ...prev[Token.ETH],
          balance: Number(ethBalance),
          usdValue: Number(ethBalance) * ethPrice,
        },
        [Token.USDT]: {
          ...prev[Token.USDT],
          balance: Number(usdtBalance),
          usdValue: Number(usdtBalance) * usdtPrice,
        },
      }));
      setTotalValue(
        Number(ethBalance) * ethPrice + Number(usdtBalance) * usdtPrice
      );
    };
    fetchBalanceAndPrice();
  }, [account]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Balance Display */}
      <div className="flex flex-col gap-2 py-12 text-center">
        <h1 className="text-5xl font-bold">${totalValue.toFixed(2)}</h1>
        {/* <p className="text-foreground text-sm">
            +${balance.toFixed(2)} +0.00%
          </p> */}
      </div>

      {/* Actions */}
      <div className="flex w-full justify-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <SquareCard>
              <QrCode size={24} color="var(--primary)" />
              Receive
            </SquareCard>
          </DialogTrigger>
          <DialogContent className="flex w-2/3 flex-col items-center justify-center gap-6 border-none">
            <DialogTitle className="text-xl font-semibold">
              Scan to get address
            </DialogTitle>
            {account?.wallet.address && (
              <>
                <div className="flex items-center justify-center rounded-4xl bg-white p-6">
                  <QRCodeSVG value={account?.wallet.address} size={240} />
                </div>
                <div className="flex max-w-[240px] items-center justify-center gap-2">
                  <p className="text-foreground text-sm break-all">
                    {account?.wallet.address}
                  </p>
                  <Copy
                    size={24}
                    color="var(--primary)"
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopyAddress(account?.wallet.address || "")
                    }
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={openSendTokenDialog}
          onOpenChange={setOpenSendTokenDialog}
        >
          <DialogTrigger asChild>
            <SquareCard>
              <Send size={24} color="var(--primary)" />
              Send
            </SquareCard>
          </DialogTrigger>
          <DialogContent className="flex w-2/3 flex-col items-center justify-center gap-6 border-none">
            <DialogTitle className="text-xl font-semibold">
              {sendTokenDialogStep === "selectToken"
                ? "Send"
                : sendTokenDialogStep === "enterAmount"
                  ? `Send ${selectedToken}`
                  : "Finished"}
            </DialogTitle>
            <div className="flex w-full flex-col gap-2">
              {sendTokenDialogStep === "selectToken" && (
                <>
                  {Object.values(tokens).map((token) => (
                    <div
                      key={`send-${token.name}`}
                      className="cursor-pointer"
                      onClick={() => handleSelectToken(token)}
                    >
                      <ListCard
                        disabled={token.disabled}
                        className="flex cursor-default items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <Image
                            src={token.icon}
                            alt={token.name}
                            width={30}
                            height={30}
                          />
                          <div className="flex flex-col gap-1">
                            <h3 className="text-foreground text-lg">
                              {token.name}
                            </h3>
                            <p className="text-muted-foreground text-xs">
                              {token.balance} {token.symbol}
                            </p>
                          </div>
                        </div>
                      </ListCard>
                    </div>
                  ))}
                </>
              )}
              {sendTokenDialogStep === "enterAmount" && (
                <div className="flex w-full flex-col gap-2">
                  <Input
                    type="string"
                    placeholder={`Recipient's ${selectedToken} address`}
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(Number(e.target.value))}
                  />
                  <Button
                    disabled={!recipientAddress || sendAmount <= 0}
                    onClick={() => handleSendToken()}
                  >
                    Send
                  </Button>
                </div>
              )}
              {sendTokenDialogStep === "finished" && (
                <div className="flex w-full flex-col gap-2">
                  <p className="text-foreground text-center">
                    {sendTokenResponseMessage}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <SquareCard disabled>
          <RefreshCw size={24} color="var(--primary)" />
          Swap
        </SquareCard>
        <SquareCard disabled>
          <CreditCard size={24} color="var(--primary)" />
          Buy
        </SquareCard>
      </div>

      {/* Token List */}
      <h1 className="mt-8 ml-2 text-xl font-semibold">Tokens</h1>
      <div className="mt-4 space-y-2">
        {Object.values(tokens).map((token, index) => (
          <ListCard
            key={index}
            disabled={token.disabled}
            className="flex cursor-default items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Image src={token.icon} alt={token.name} width={30} height={30} />
              <div className="flex flex-col gap-1">
                <h3 className="text-foreground text-lg">{token.name}</h3>
                <p className="text-muted-foreground text-xs">
                  {token.balance} {token.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground text-lg font-semibold">
                ${token.usdValue.toFixed(2)}
              </p>
              {/* <p className="text-accent-foreground text-xs">+0.00%</p> */}
            </div>
          </ListCard>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

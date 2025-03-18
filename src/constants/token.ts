import { Erc20Token, Token } from "@/types/bo";

export const tokenAddresses: Record<Erc20Token, string> = {
  [Erc20Token.USDT]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  [Erc20Token.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

export const tokenNames: Record<Token, string> = {
  [Token.ETH]: "Ethereum",
  [Token.USDT]: "Tether",
  [Token.USDC]: "USD Coin",
};

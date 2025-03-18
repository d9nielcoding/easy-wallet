import { StaticImageData } from "next/image";

export enum Chain {
  BITCOIN = "bitcoin",
  ETHEREUM = "ethereum",
  SOLANA = "solana",
  SUI = "sui",
  POLYGON = "polygon",
}

export enum Erc20Token {
  USDT = "USDT",
  USDC = "USDC",
}

export enum Token {
  ETH = "ETH",
  USDT = Erc20Token.USDT,
  USDC = Erc20Token.USDC,
}

export enum Currency {
  USD = "usd",
  TWD = "twd",
}

export interface IWallet {
  address: string;
  mnemonic?: string;
  mnkey?: string;
  chain?: Chain;
}

export interface IEthWallet extends IWallet {
  chain: Chain.ETHEREUM;
  tokenAddress?: string;
}

export interface IAccount {
  displayName: string;
  wallet: IWallet;
}

export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  value: string; // Wei
  contractAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  gasUsed?: string;
  timestamp: string;
}

export interface IToken {
  name: Token;
  symbol: string;
  balance: number;
  usdValue: number;
  icon: StaticImageData;
  disabled: boolean;
}

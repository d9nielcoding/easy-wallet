export enum Chain {
  BITCOIN = "bitcoin",
  ETHEREUM = "ethereum",
  SOLANA = "solana",
  SUI = "sui",
  POLYGON = "polygon",
}

export interface IWallet {
  address: string;
  mnemonic: string;
  chain?: Chain;
}

export interface IAccount {
  displayName: string;
  wallet: IWallet;
}

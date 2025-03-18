import { Chain, Token } from "@/types/bo";
import { StaticImageData } from "next/image";
import ChainBitcoin from "/public/chain/bitcoin.png";
import ChainEthereum from "/public/chain/ethereum.png";
import ChainPolygon from "/public/chain/polygon.webp";
import ChainSolana from "/public/chain/solana.png";
import ChainSui from "/public/chain/sui.png";
import TokenETH from "/public/token/eth.png";
import TokenUSDC from "/public/token/usdc.png";
import TokenUSDT from "/public/token/usdt.png";

export const ChainImages: Record<Chain, StaticImageData> = {
  [Chain.ETHEREUM]: ChainEthereum,
  [Chain.SOLANA]: ChainSolana,
  [Chain.SUI]: ChainSui,
  [Chain.POLYGON]: ChainPolygon,
  [Chain.BITCOIN]: ChainBitcoin,
};

export const TokenImages: Record<string, StaticImageData> = {
  [Token.USDT]: TokenUSDT,
  [Token.USDC]: TokenUSDC,
  [Token.ETH]: TokenETH,
};

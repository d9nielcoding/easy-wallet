import { StaticImageData } from "next/image";
import ChainBitcoin from "/public/chain/bitcoin.png";
import ChainEthereum from "/public/chain/ethereum.png";
import ChainPolygon from "/public/chain/polygon.webp";
import ChainSolana from "/public/chain/solana.png";
import ChainSui from "/public/chain/sui.png";

import { Chain } from "@/types/bo";

export const ChainImages: Record<Chain, StaticImageData> = {
  [Chain.ETHEREUM]: ChainEthereum,
  [Chain.SOLANA]: ChainSolana,
  [Chain.SUI]: ChainSui,
  [Chain.POLYGON]: ChainPolygon,
  [Chain.BITCOIN]: ChainBitcoin,
};

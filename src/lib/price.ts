import { Currency } from "@/types/bo";

export const getTokenPrice = async (
  tokenSymbol: string,
  currency: Currency = Currency.USD
): Promise<number> => {
  tokenSymbol = tokenSymbol.toLowerCase();
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=${currency}`
  );
  const data = await response.json();
  return Number(data?.[tokenSymbol]?.[currency]) ?? 0;
};

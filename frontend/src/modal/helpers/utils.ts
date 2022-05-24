import { CHAIN_DATA_LIST } from "../constants";
import { ChainData } from ".";

export const getProviderDescription = (name: string, type: string): string => {
  let description = "";
  if (description) return description;
  switch (type) {
    case "injected":
      description = `Connect to your ${name} Wallet`;
      break;
    default:
      break;
  }
  return description || "";
};

export function getChainId(network: string): number {
  const chains: ChainData[] = Object.values(CHAIN_DATA_LIST);
  const match = filterMatches<ChainData>(
    chains,
    (x) => x.network === network,
    undefined
  );
  if (!match) {
    throw new Error(`No chainId found match ${network}`);
  }
  return match.chainId;
}

export function filterMatches<T>(
  array: T[],
  condition: (x: T) => boolean,
  fallback: T | undefined
): T | undefined {
  let result = fallback;
  const matches = array.filter(condition);

  if (!!matches && matches.length) {
    result = matches[0];
  }

  return result;
}

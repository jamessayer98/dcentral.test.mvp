import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";

export const bigNumberToEther = (hexPrice: BigNumber) => {
  const priceInWei = hexPrice.toString();
  const priceInEther = formatEther(priceInWei);
  return Number(priceInEther);
};

export const ethersToWei = (ethers: Number | number) => {
  const wei = parseEther(String(ethers));
  return wei;
};

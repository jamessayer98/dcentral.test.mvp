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

export const bigNumberToNumber = (number: BigNumber) => {
  const numberStr = number.toString();
  return Number(numberStr);
};

export const getImageUrl = (metadataImage: string) => {
  if (metadataImage === "") return undefined;
  const strippedMetaImage = metadataImage.split("ipfs://")[1];
  return `https://ipfs.io/ipfs/${strippedMetaImage}`;
};

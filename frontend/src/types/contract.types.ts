import { BigNumber } from "ethers";

export type MarketItem = {
  tokenId: BigNumber;
  creator: string;
  seller: string;
  owner: string;
  price: BigNumber;
  sold: boolean;
};

export type MarketItems = Array<MarketItem>;

export interface NFTMetadata {
  attributes: Array<any>;
  description: string;
  image: string;
  name: string;
}

export interface UserNFT extends NFTMetadata {
  price: number;
}

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

export type NFTAttributes = {
  trait_type: string;
  value: string;
};

export interface NFTMetadata {
  attributes: Array<NFTAttributes>;
  description: string;
  image: string;
  name: string;
}

export interface NFT extends Partial<NFTMetadata>, Partial<MarketItem> {}

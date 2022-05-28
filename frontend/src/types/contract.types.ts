export type MarketItem = {
  tokenId: number;
  creator: string;
  seller: string;
  owner: string;
  price: number;
  sold: boolean;
};

export type MarketItems = Array<MarketItem>;

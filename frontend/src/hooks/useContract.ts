import { BigNumber, Contract } from "ethers";
import artifact from "../helpers/contractabi.json";
import { useWeb3 } from "../context/Web3Provider";
import { MarketItems, NFTMetadata } from "../types/contract.types";
import {
  bigNumberToEther,
  bigNumberToNumber,
  ethersToWei,
} from "../utils/contract";
const contractAddress = "0x53010A0DCE9f31e5630f106a2e3CAcaB5Eb9F6DB";

export const useContract = () => {
  const { web3 } = useWeb3();
  const { provider, signer } = web3;

  let signerContract: Contract;
  let nonSignerContract: Contract;

  if (provider && signer) {
    signerContract = new Contract(contractAddress, artifact.abi, signer);
    nonSignerContract = new Contract(contractAddress, artifact.abi, provider);
  }

  const updateListingPrice = async (price: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.updateListingPrice(ethersToWei(price));
    return txHash;
  };

  const getListingPrice = async () => {
    if (!isWalletConnected()) return;

    const hexPrice: BigNumber = await nonSignerContract.getListingPrice();
    return bigNumberToEther(hexPrice);
  };

  const mintNft = async (tokenURI: string) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.mintNft(tokenURI);
    signerContract.on("Transfer", async (_, __, tokenId) => {
      await createMarketItem(tokenId, 0.0035);
    });
    return txHash;
  };

  const tokenUri = async (tokenId: number) => {
    if (!isWalletConnected()) return;

    const uri = await nonSignerContract.tokenURI(tokenId);
    return uri;
  };

  const NFTmetadata = async (tokenUri: string) => {
    const resp = await fetch(`https://gateway.pinata.cloud/ipfs/${tokenUri}`);
    const respJson: NFTMetadata = await resp.json();
    return respJson;
  };

  const getNftMetadata = async (tokenId: number) => {
    if (!isWalletConnected()) return;

    const uri = await tokenUri(tokenId);
    const metadata = await NFTmetadata(uri);
    return metadata;
  };

  const fetchItemsCreated = async () => {
    if (isWalletConnected()) return;

    const createdItems = await nonSignerContract.fetchItemsCreated();
    return createdItems;
  };

  const createMarketItem = async (tokenId: BigNumber, price: number) => {
    if (!isWalletConnected()) return;

    const numTokenId = bigNumberToNumber(tokenId);

    const txHash = await signerContract.createMarketItem(
      numTokenId,
      ethersToWei(price),
      {
        value: 0,
      }
    );
    signerContract.on(
      "MarketItemCreated",
      (tokenId, creator, owner, seller, price, sold) => {
        console.log("NFT put into market");
      }
    );
    const reciept = await txHash.wait();
    return reciept;
  };

  const resellNft = async (tokenId: BigNumber, price: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.resellNft(tokenId, ethersToWei(price));
    const reciept = await txHash.wait();
    return reciept;
  };

  const createMarketSale = async (tokenId: BigNumber, price: BigNumber) => {
    if (!isWalletConnected()) return;

    const numTokenId = bigNumberToNumber(tokenId);
    const priceInWei = ethersToWei(bigNumberToEther(price));

    const txHash = await signerContract.createMarketSale(numTokenId, {
      value: priceInWei,
    });
    const reciept = await txHash.wait();
    return reciept;
  };

  const fetchMarketItems = async () => {
    if (!isWalletConnected()) return;

    const marketItems: MarketItems = await nonSignerContract.fetchMarketItems();
    return marketItems;
  };

  const fetchAllMyNfts = async () => {
    if (!isWalletConnected()) return;

    const allMyNfts: MarketItems = await nonSignerContract.fetchAllOfMyNfts();
    return allMyNfts;
  };

  const fetchAllNfts = async () => {
    if (!isWalletConnected()) return;

    const allNfts: MarketItems = await nonSignerContract.fetchAllItems();
    return allNfts;
  };

  const fetchCreatedNfts = async () => {
    if (!isWalletConnected()) return;

    const createdNfts: MarketItems =
      await nonSignerContract.fetchMyCreatedNfts();
    return createdNfts;
  };

  const fetchBoughtNfts = async () => {
    if (!isWalletConnected()) return;

    const boughtNfts: MarketItems = await nonSignerContract.fetchNftsBought();
    return boughtNfts;
  };

  const fetchItemsListed = async () => {
    if (!isWalletConnected()) return;

    const itemsListed: MarketItems = await nonSignerContract.fetchItemsListed();
    return itemsListed;
  };

  const creatorOfNft = async (id: number) => {
    if (!isWalletConnected()) return;

    const address: string = await nonSignerContract.creatorOfNft(id);
    return address;
  };

  const idToMarketItem = async (tokenId: number) => {
    if (!isWalletConnected()) return;

    const someResponse = await nonSignerContract.idToMarketItem(tokenId);
    return someResponse;
  };

  const fetchMintedNfts = async () => {
    if (!isWalletConnected()) return;

    const marketItems = await fetchMarketItems();
  };

  const isWalletConnected = () => !!nonSignerContract && !!signerContract;

  return {
    updateListingPrice,
    getListingPrice,
    mintNft,
    tokenUri,
    NFTmetadata,
    getNftMetadata,
    resellNft,
    fetchItemsCreated,
    createMarketItem,
    createMarketSale,
    creatorOfNft,
    fetchAllMyNfts,
    fetchCreatedNfts,
    fetchBoughtNfts,
    fetchItemsListed,
    fetchMarketItems,
    idToMarketItem,
    fetchAllNfts,
  };
};

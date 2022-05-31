import { BigNumber, Contract } from "ethers";
import artifact from "../helpers/contractabi.json";
import { useWeb3 } from "../context/Web3Provider";
import { MarketItems, NFTMetadata } from "../types/contract.types";
import { bigNumberToEther, ethersToWei } from "../utils/contract";
const contractAddress = "0x2847d7Acb475B86163Cd362DaafF61415FAFf37F";

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
    signerContract.on("Transfer", (_, __, tokenId) => {
      console.log("NFT successfully minted with tokenId: ");
      console.log(tokenId);
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

  const createMarketItem = async (tokenId: number, price: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.createMarketItem(
      tokenId,
      ethersToWei(price),
      {
        value: 0,
      }
    );
    signerContract.on(
      "MarketItemCreated",
      (tokenId, creator, owner, seller, price, sold) => {
        console.log(tokenId);
        console.log(creator);
        console.log(owner);
        console.log(seller);
        console.log(price);
      }
    );
    const reciept = await txHash.wait();
    return reciept;
  };

  const resellNft = async (tokenId: number, price: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.resellNft(tokenId, ethersToWei(price));
    const reciept = await txHash.wait();
    return reciept;
  };

  const createMarketSale = async (tokenId: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.createMarketSale(tokenId);
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

    const allNfts: MarketItems = await nonSignerContract.fetchAllOfMyNfts();
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
  };
};

import { BigNumber, Contract } from "ethers";
import artifact from "../helpers/contractabi.json";
import { useWeb3 } from "../context/Web3Provider";
import { MarketItems } from "../types/contract.types";
import { bigNumberToEther, ethersToWei } from "../utils/contract";
const contractAddress = "0x9c242c11df4c05de56d2ecc3df2b7b342d9360f9";

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

    const tokenId: number = await signerContract.mintNft(tokenURI);
    return tokenId;
  };

  const createMarketItem = async (tokenId: number, price: number) => {
    if (!isWalletConnected()) return;

    const txHash = await signerContract.createMarketItem(
      tokenId,
      ethersToWei(price)
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

  const fetchMyNFTs = async () => {
    if (!isWalletConnected()) return;

    const myNfts: MarketItems = await nonSignerContract.fetchMyNFTs();
    return myNfts;
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

  const isWalletConnected = () => !!nonSignerContract && !!signerContract;

  return {
    updateListingPrice,
    getListingPrice,
    mintNft,
    resellNft,
    createMarketItem,
    createMarketSale,
    creatorOfNft,
    fetchMyNFTs,
    fetchItemsListed,
    fetchMarketItems,
  };
};

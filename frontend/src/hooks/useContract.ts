import { ethers } from "ethers";
import Contract from "../helpers/contractabi.json";
import { useWeb3 } from "../context/Web3Provider";
const contractAddress = "0x9c242c11df4c05de56d2ecc3df2b7b342d9360f9";

export const useContract = () => {
  const { web3 } = useWeb3();

  const { provider, signer } = web3;

  let signerContract: ethers.Contract;
  let nonSignerContract: ethers.Contract;

  if (provider && signer) {
    signerContract = new ethers.Contract(contractAddress, Contract.abi, signer);

    nonSignerContract = new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
  }
  const updateListingPrice = async (price: number) => {
    const txHash = await signerContract.updateListingPrice(price);
    return txHash;
  };

  const getListingPrice = async () => {
    const price = await nonSignerContract.getListingPrice();
    return price;
  };

  const mintNft = async (tokenURI: string) => {
    const tokenId = await signerContract.mintNft(tokenURI);
    return tokenId;
  };

  const createMarketItem = async (tokenId: number, price: number) => {
    const txHash = await signerContract.createMarketItem(tokenId, price);
    return txHash;
    //Add event
  };

  const resellNft = async (tokenId: number, price: number) => {
    const txHash = await signerContract.resellNft(tokenId, price);
    return txHash;
  };

  const createMarketSale = async (tokenId: number) => {
    const txHash = await signerContract.createMarketSale(tokenId);
    return txHash;
  };

  const fetchMarketItems = async () => {
    const marketItems = await nonSignerContract.fetchMarketItems();
    return marketItems;
  };

  const fetchMyNFTs = async () => {
    const items = await nonSignerContract.fetchMyNFTs();
    return items;
  };

  const fetchItemsListed = async () => {
    const items = await nonSignerContract.fetchItemsListed();
    return items;
  };

  const creatorOfNft = async (id: number) => {
    const address = await nonSignerContract.creatorOfNft();
    return address;
  };

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

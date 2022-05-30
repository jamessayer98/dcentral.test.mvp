import { useState, useEffect } from "react";
import { Button, Container, Grid, GridItem, Input } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { NFTMetadata, UserNFT } from "../../types/contract.types";
import { UserNFTCard } from "./UserNFTCard";
import { bigNumberToEther, bigNumberToNumber } from "../../utils/contract";

type Props = {};

export const UserNFTCollection = (props: Props) => {
  const { web3 } = useWeb3();
  const [nftCollection, setnftCollection] = useState<Array<UserNFT>>([]);
  const [tokenURI, setTokenURI] = useState("");
  const [loading, setLoading] = useState<Boolean>(true);
  const { getNftMetadata, fetchMarketItems, mintNft } = useContract();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const marketItems = await fetchMarketItems();
      const allMetadata = await Promise.all(
        marketItems
          .filter((item) => bigNumberToNumber(item.tokenId) > 0)
          .map(async (item) => {
            const { price, tokenId } = item;
            const metadata = await getNftMetadata(bigNumberToNumber(tokenId));
            const intPrice = bigNumberToEther(price);
            return { price: intPrice, ...metadata };
          })
      );
      setnftCollection(allMetadata);
      setLoading(false);
    })();
  }, [web3]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenURI(e.target.value);
  };

  const handleMint = async () => {
    if (tokenURI === "") {
      alert("Please enter tokenURI");
      return;
    }
    const txHash = await mintNft(tokenURI);
  };

  return (
    <Container maxWidth="800px" mt={3} py={3}>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {nftCollection.map((item, index) => {
          const { name, description, image, attributes, price } = item;
          return (
            <GridItem key={`${index}`}>
              <UserNFTCard
                name={name}
                description={description}
                image={image}
                attributes={attributes}
                price={price}
              />
            </GridItem>
          );
        })}
      </Grid>
      <Button onClick={handleMint}>Mint NFT</Button>
      <Input
        type="text"
        name="tokenURI"
        value={tokenURI}
        onChange={handleInputChange}
      />
    </Container>
  );
};

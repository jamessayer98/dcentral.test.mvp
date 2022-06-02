import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  GridItem,
  Input,
  Divider,
} from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { NFT } from "../../types/contract.types";
import { UserNFTCard } from "./UserNFTCard";
import { bigNumberToNumber } from "../../utils/contract";
import { useWalletOpts } from "../../hooks/useWalletOpts";

type Props = {};

export const UserNFTCollection = (props: Props) => {
  const { web3 } = useWeb3();
  const [nftCollection, setnftCollection] = useState<Array<NFT>>([]);
  const [tokenURI, setTokenURI] = useState("");
  const { walletOpts } = useWalletOpts();
  const { address } = walletOpts;

  const { getNftMetadata, mintNft, fetchMarketItems } = useContract();

  useEffect(() => {
    (async () => {
      const allMyNfts = await fetchMarketItems();
      if (allMyNfts) {
        const allMetadata = await Promise.all(
          allMyNfts
            .filter((item) => item.owner === address || item.seller === address)
            .map(async (item) => {
              const { price, tokenId } = item;
              const metadata = await getNftMetadata(bigNumberToNumber(tokenId));
              return { price, tokenId, ...metadata };
            })
        );
        setnftCollection(allMetadata);
      }
    })();
  }, [web3]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenURI(e.target.value);
  };

  const handleMint = async () => {
    if (tokenURI === "") {
      alert("You must specify token URI");
      return;
    }
    const marketItem = await mintNft(tokenURI);
    if (!marketItem) alert("Only owner can mint new tokens!");
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
        <Button onClick={handleMint}>Mint NFT</Button>
        <Input
          type="text"
          name="tokenURI"
          value={tokenURI}
          onChange={handleInputChange}
          placeholder="Enter Token URI"
        />
      </Grid>
      <Divider mt={5} mb={5} orientation="horizontal" />
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {nftCollection.map((item, index) => {
          const { name, description, image, attributes, price, tokenId, sold } =
            item;
          return (
            <GridItem key={`${index}`}>
              <UserNFTCard
                name={name}
                description={description}
                image={image}
                attributes={attributes}
                price={price}
                tokenId={tokenId}
                sold={sold}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
};

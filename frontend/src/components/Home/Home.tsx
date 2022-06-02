import { useState, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { NFT } from "../../types/contract.types";
import { NFTCard } from "./NFTCard";
import { bigNumberToNumber } from "../../utils/contract";
import { useWalletOpts } from "../../hooks/useWalletOpts";

type Props = {};

export const Home = (props: Props) => {
  const { fetchMarketItems, getNftMetadata } = useContract();
  const { web3 } = useWeb3();
  const [marketItems, setMarketItems] = useState<Array<NFT>>([]);
  const { walletOpts } = useWalletOpts();
  const { address } = walletOpts;

  useEffect(() => {
    (async () => {
      const marketItems = await fetchMarketItems();
      if (marketItems) {
        const allMetadata = await Promise.all(
          marketItems
            .filter((item) => item.owner !== address && item.seller !== address)
            .map(async (item) => {
              const { price, tokenId } = item;
              const metadata = await getNftMetadata(bigNumberToNumber(tokenId));
              return { price, tokenId, ...metadata };
            })
        );
        setMarketItems(allMetadata);
      }
    })();
  }, [web3]);

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
        {marketItems.map((item, index) => {
          const { name, description, image, attributes, price, tokenId } = item;
          return (
            <GridItem key={`${index}`}>
              <NFTCard
                name={name}
                description={description}
                image={image}
                attributes={attributes}
                price={price}
                tokenId={tokenId}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
};

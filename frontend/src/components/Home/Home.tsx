import { useState, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { MarketItems, NFT } from "../../types/contract.types";
import { NFTCard } from "./NFTCard";
import { bigNumberToEther, bigNumberToNumber } from "../../utils/contract";
import { UserNFTCard } from "../User/UserNFTCard";
import { useWalletOpts } from "../../hooks/useWalletOpts";

type Props = {};

export const Home = (props: Props) => {
  const { fetchMarketItems, getNftMetadata } = useContract();
  const { web3 } = useWeb3();
  const [marketItems, setMarketItems] = useState<Array<NFT>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const { walletOpts } = useWalletOpts();
  const { address } = walletOpts;

  useEffect(() => {
    setLoading(true);
    (async () => {
      const marketItems = await fetchMarketItems();
      if (marketItems) {
        const allMetadata = await Promise.all(
          marketItems
            .filter(
              (item) =>
                item.creator !== address &&
                item.owner !== address &&
                item.seller !== address
            )
            .map(async (item) => {
              const { price, tokenId } = item;
              const metadata = await getNftMetadata(bigNumberToNumber(tokenId));
              return { price, tokenId, ...metadata };
            })
        );
        setMarketItems(allMetadata);
        setLoading(false);
      }
    })();
  }, [web3]);

  // if (!loading) console.log(marketItems);

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
        <GridItem>
          <NFTCard />
        </GridItem>
        <GridItem>
          <NFTCard />
        </GridItem>
        <GridItem>
          <NFTCard />
        </GridItem>
        <GridItem>
          <NFTCard />
        </GridItem>
      </Grid>
    </Container>
  );
};

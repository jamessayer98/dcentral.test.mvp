import { useState, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { MarketItems } from "../../types/contract.types";
import { NFTCard } from "./NFTCard";

type Props = {};

export const Home = (props: Props) => {
  const { fetchMarketItems } = useContract();
  const { web3 } = useWeb3();
  const [marketItems, setMarketItems] = useState<MarketItems>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const itms = await fetchMarketItems();
      if (itms) setMarketItems(itms);
      setLoading(false);
    })();
  }, [web3]);

  if (!loading) console.log(marketItems);

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

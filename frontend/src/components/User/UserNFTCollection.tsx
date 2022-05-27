import { useState, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { MarketItem } from "../../types/contract.types";
import { UserNFTCard } from "./UserNFTCard";

type Props = {};

export const UserNFTCollection = (props: Props) => {
  const { fetchMyNFTs } = useContract();
  const { web3 } = useWeb3();
  const [collection, setCollection] = useState<Array<MarketItem>>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const myNfts = await fetchMyNFTs();
      if (myNfts) setCollection(myNfts);
      setLoading(false);
    })();
  }, [web3]);

  if (!loading) console.log(collection);

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
          <UserNFTCard />
        </GridItem>
        <GridItem>
          <UserNFTCard />
        </GridItem>
      </Grid>
    </Container>
  );
};

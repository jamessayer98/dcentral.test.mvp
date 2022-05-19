import { Container, Grid, GridItem } from "@chakra-ui/react";
import { NFTCard } from "./NFTCard";

type Props = {};

export const Home = (props: Props) => {
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

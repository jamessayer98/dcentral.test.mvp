import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NFTDescriptionTable } from "./NFTDescriptionTable";
import { useParams } from "react-router-dom";
import { useContract } from "../../hooks/useContract";
import { MarketItem, NFT, NFTMetadata } from "../../types/contract.types";
import { useEffect, useState } from "react";
import { useWeb3 } from "../../context/Web3Provider";
import { bigNumberToNumber, getImageUrl } from "../../utils/contract";

type Props = {};

export const NFTDetails = (props: Props) => {
  const { id } = useParams();
  const { idToMarketItem, getNftMetadata } = useContract();
  const { web3 } = useWeb3();
  const [currentNft, setCurrentNft] = useState<NFT>({});
  const { createMarketSale } = useContract();
  const { name, description, image, tokenId, price } = currentNft;

  const handleBuy = async () => {
    if (web3 && tokenId && price) {
      const marketSale = await createMarketSale(tokenId, price);
      console.log(marketSale);
    }
  };

  useEffect(() => {
    (async () => {
      if (web3 && id) {
        const marketItem: MarketItem = await idToMarketItem(Number(id));
        const nftMetadata: NFTMetadata = await getNftMetadata(Number(id));
        setCurrentNft({ ...marketItem, ...nftMetadata });
      }
    })();
  }, [web3, id]);

  return (
    <Container maxWidth="1000px" mt={3} py={3}>
      <Stack direction={["column", "column", "row"]} spacing={4}>
        <Box
          w="300px"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Image
            borderRadius={10}
            objectFit="contain"
            src={
              getImageUrl(image || "")
              // || "https://lh3.googleusercontent.com/tdWPH_UcLdIFqSLK7MapK5cHR_G9IBuMCIf7Is-AW_etOiaPOmjkKrwShgTfXc-isCvfv7Vi5XXMIIJiO_zWf6_I5qJq0RCRKTxs=w600"
            }
            alt="Cool NFT"
            fallbackSrc="https://via.placeholder.com/300"
          />
        </Box>
        <Stack w="100%">
          <Box
            borderRadius={10}
            border="1px"
            borderColor="purple.400"
            w="100%"
            p={3}
          >
            <Heading color="purple.400">
              {tokenId
                ? `METT #${bigNumberToNumber(tokenId)} ${name}`
                : `Ghost #2163`}
            </Heading>
            <Button
              my={4}
              w="100%"
              bgColor="purple.400"
              colorScheme="purple"
              onClick={handleBuy}
            >
              Buy
            </Button>
          </Box>
          <Box
            borderRadius={10}
            border="1px"
            borderColor="purple.400"
            w="100%"
            p={3}
          >
            <Heading size="md" my={3}>
              Description
            </Heading>
            <Text color="purple.400" my={3} textDecoration="underline">
              Created by PhantomNetwork
            </Text>
            <Text>
              {description
                ? description
                : `The underbelly of Web3. A shadow vague, formless, but eternal.`}
            </Text>
          </Box>
          <Box
            borderRadius={10}
            border="1px"
            borderColor="purple.400"
            w="100%"
            p={3}
          >
            <Heading size="md" my={3}>
              Details
            </Heading>
            <NFTDescriptionTable />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

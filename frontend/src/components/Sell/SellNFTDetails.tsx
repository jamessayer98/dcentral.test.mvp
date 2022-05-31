import { Box, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWeb3 } from "../../context/Web3Provider";
import { useContract } from "../../hooks/useContract";
import { MarketItem, NFT, NFTMetadata } from "../../types/contract.types";
import { bigNumberToNumber, getImageUrl } from "../../utils/contract";
import { SellPriceModal } from "./SellPriceModal";

type Props = {};

export const SellNFTDetails = (props: Props) => {
  const { id } = useParams();
  const { idToMarketItem, getNftMetadata } = useContract();
  const { web3 } = useWeb3();
  const [currentNft, setCurrentNft] = useState<NFT>({});

  useEffect(() => {
    (async () => {
      if (web3 && id) {
        const marketItem: MarketItem = await idToMarketItem(Number(id));
        const nftMetadata: NFTMetadata = await getNftMetadata(Number(id));
        setCurrentNft({ ...marketItem, ...nftMetadata });
      }
    })();
  }, [web3, id]);

  const { name, description, image, tokenId, price } = currentNft;

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
              image
                ? getImageUrl(image)
                : "https://lh3.googleusercontent.com/ViaGqCKMMptuIR9_KaEeevN42T7CdjOXBlvkKH5N8PoO8isRhBVbDLSH8c9bAb4AaTMfNbbbeiwTbgPcx0Z9INDsSPbrJZYJN6jezg=w600"
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
              {tokenId ? `METT #${bigNumberToNumber(tokenId)}` : `Ghost #2163`}
            </Heading>
            <SellPriceModal />
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
        </Stack>
      </Stack>
    </Container>
  );
};

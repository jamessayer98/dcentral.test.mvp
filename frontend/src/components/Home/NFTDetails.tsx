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

type Props = {};

export const NFTDetails = (props: Props) => {
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
            src="https://lh3.googleusercontent.com/tdWPH_UcLdIFqSLK7MapK5cHR_G9IBuMCIf7Is-AW_etOiaPOmjkKrwShgTfXc-isCvfv7Vi5XXMIIJiO_zWf6_I5qJq0RCRKTxs=w600"
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
            <Heading color="purple.400">Ghost #2163</Heading>
            <Button my={4} w="100%" bgColor="purple.400" colorScheme="purple">
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
              The underbelly of Web3. A shadow vague, formless, but eternal.
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

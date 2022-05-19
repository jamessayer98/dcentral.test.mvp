import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

type Props = {};

export const NFTDetails = (props: Props) => {
  return (
    <Container maxWidth="800px" mt={3} py={3}>
      <Stack direction={["column", "column", "row"]} spacing={4}>
        <Box
          w="300px"
          display="flex"
          alignItems="center"
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
        <Box
          borderRadius={10}
          border="1px"
          borderColor="purple.500"
          w="100%"
          p={3}
        >
          <Heading color="purple.400">Ghost #2163</Heading>
          <Stack my={3} direction="row">
            <Text as="h5">Owned by</Text>
            <Text as="h5" color="purple.400">
              ABDNeutral
            </Text>
          </Stack>
          <Button w="100%" bgColor="purple.500" colorScheme="purple">
            Place Bid
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

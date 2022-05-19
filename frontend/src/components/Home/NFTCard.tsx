import {
  Box,
  Divider,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {};

export const NFTCard = (props: Props) => {
  return (
    <Link to="/n/1">
      <Stack>
        <Box
          bg={useColorModeValue("gray.200", "gray.600")}
          borderRadius={10}
          border="2px"
          borderColor="purple.400"
          _hover={{
            borderColor: "purple.500",
            cursor: "pointer",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Image
            borderRadius={10}
            objectFit="contain"
            src="https://lh3.googleusercontent.com/tdWPH_UcLdIFqSLK7MapK5cHR_G9IBuMCIf7Is-AW_etOiaPOmjkKrwShgTfXc-isCvfv7Vi5XXMIIJiO_zWf6_I5qJq0RCRKTxs=w600"
            alt="Cool NFT"
            fallbackSrc="https://via.placeholder.com/300"
          />
          <Box p={2}>
            <Heading as="h3" size="md" my={1}>
              The cool NFT
            </Heading>
            <Heading
              as="h6"
              size="sm"
              mb={1}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Ghost #3267
            </Heading>
            <Divider />
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Heading
                as="h5"
                size="sm"
                my={1}
                color={useColorModeValue("gray.600", "gray.300")}
              >
                $0.00
              </Heading>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Link>
  );
};

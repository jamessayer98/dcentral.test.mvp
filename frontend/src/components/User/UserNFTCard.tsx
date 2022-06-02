import {
  Box,
  Divider,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { Link } from "react-router-dom";
import {
  bigNumberToEther,
  bigNumberToNumber,
  getImageUrl,
} from "../../utils/contract";

type Props = {
  attributes?: Array<any>;
  description?: string;
  image?: string;
  name?: string;
  price?: BigNumber;
  tokenId?: BigNumber;
  sold?: boolean;
};

export const UserNFTCard = (props: Props) => {
  const { name, image, price, tokenId, sold } = props;

  return (
    <Link to={tokenId ? `/sell/${bigNumberToNumber(tokenId)}` : `/buy/1`}>
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
            src={
              getImageUrl(image || "")
              // "https://lh3.googleusercontent.com/cMNCGsTG0Li4wC2dBC3jZevN4be9aXM1lNQ9JG334IDaMgJNQXAJXfvr0pFrvvkIeESSBYPwMr5QGl0SGofj7jf4r8UTqsSMsjkw=w600"
            }
            alt="Cool NFT"
            fallbackSrc="https://via.placeholder.com/300"
          />
          <Box p={2}>
            <Heading as="h3" size="md" my={1}>
              {name ? name : `The Cool NFT`}
            </Heading>
            <Heading
              as="h6"
              size="sm"
              mb={1}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              {tokenId ? `METT #${bigNumberToNumber(tokenId)}` : `Ghost #3737`}
            </Heading>
            <Divider />
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Heading
                as="h5"
                size="sm"
                my={1}
                color={useColorModeValue("gray.600", "gray.300")}
              >
                {price ? `${bigNumberToEther(price)} Eth` : `$0.00`}
              </Heading>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Link>
  );
};

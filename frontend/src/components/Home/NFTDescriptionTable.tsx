import {
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatNumber,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiBitcoin } from "react-icons/bi";

type Props = {};

export const NFTDescriptionTable = (props: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Ghost #2163</TableCaption>
        <Thead>
          <Tr>
            <Th>Price</Th>
            <Th>USD Price</Th>
            <Th>Floor Difference</Th>
            <Th>Expiration</Th>
            <Th>From</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from(Array(10).keys()).map((i) => (
            <Tr key={i}>
              <Td>
                <Stack direction="row">
                  <BiBitcoin /> <Text>21 BTC</Text>
                </Stack>
              </Td>
              <Td>$399.9</Td>
              <Td>
                <StatGroup>
                  <Stat>
                    <StatNumber fontSize="lg">$25</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Td>
              <Td>2 minutes</Td>
              <Td color="purple.300">NFT_GORILLA</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

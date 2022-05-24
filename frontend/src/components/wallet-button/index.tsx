import { FC } from "react";
import Web3Modal from "../../modal/core";
import { getProviderDescription, ICoreOptions } from "../../modal/helpers";
import { SUPPORTED_WALLETS } from "../../modal/constants";
import { FaWallet } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Box,
  Image,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";

export const WalletButton: FC = () => {
  const handleAccountChange = () => {};
  const { setWeb3 } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConnect = async (opts: ICoreOptions) => {
    const web3Modal = new Web3Modal(opts);
    const { ethProvider, provider, signer } = await web3Modal.connect({
      handleAccountChange,
    });
    setWeb3({ ethProvider, provider, signer });
    const address = await signer.getAddress();
    console.log(address);
  };

  return (
    <div>
      <Button
        width="100%"
        colorScheme="purple"
        variant="outline"
        mt={6}
        mb={6}
        type="submit"
        onClick={onOpen}
      >
        <FaWallet style={{ marginRight: "10px" }} />
        Connect Wallet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid h="200px" w="300px" templateColumns="repeat(2, 1fr)">
              {SUPPORTED_WALLETS.map((wallet) => {
                let { logo, id, name, description, type, check } = wallet;
                description = description || getProviderDescription(name, type);
                return (
                  <GridItem
                    background="gray.100"
                    borderRadius="10px"
                    padding="10px"
                    key={name + description}
                    onClick={() => {
                      const opts: ICoreOptions = {
                        id,
                        name,
                        type,
                        check,
                      };
                      handleConnect(opts);
                    }}
                  >
                    <Flex
                      direction="column"
                      justify="center"
                      align="center"
                      w="200px"
                      h="200px"
                    >
                      <Text fontSize="2xl">{name}</Text>
                      <Box boxSize="100px">
                        <Image src={logo} alt="img" />
                      </Box>
                      <Text fontSize="sm">{description}</Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

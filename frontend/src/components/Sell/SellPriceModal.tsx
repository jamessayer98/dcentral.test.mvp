import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { useContract } from "../../hooks/useContract";

type Props = {
  tokenId?: BigNumber;
  price?: BigNumber;
  sold?: boolean;
};

export const SellPriceModal = (props: Props) => {
  const { sold, tokenId, price } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "",
    },
  });

  const { resellNft } = useContract();

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleSell = async () => {
    if (!sold) {
      // NFT is being put to market for the first time
      // use createMarketItem
    } else {
      // NFT is being resold
      // use resellNft
      if (tokenId) {
        const receipt = await resellNft(tokenId, 0.004);
        console.log(receipt);
      }
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        my={4}
        w="100%"
        bgColor="purple.400"
        colorScheme="purple"
      >
        Sell
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.price}>
                    <NumberInput
                      onChange={(e: any) => field.onChange(e.target.checked)}
                      min={1}
                      placeholder="Price"
                      defaultValue={1}
                      precision={2}
                      step={1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSell}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

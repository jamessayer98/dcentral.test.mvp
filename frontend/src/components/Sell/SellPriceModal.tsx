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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  handleNftSale: (price: number) => Promise<void>;
};

export const SellPriceModal = (props: Props) => {
  const { handleNftSale } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0.003,
    },
  });

  const onSubmit = async (values) => {
    const { price } = values;
    await handleNftSale(Number(price));
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
                      onChange={(val) => field.onChange(val)}
                      min={0.0004}
                      placeholder="Price"
                      defaultValue={0.003}
                      precision={4}
                      step={0.0001}
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
              <ModalFooter>
                <Stack spacing={4} direction="row">
                  <Button type="submit" colorScheme="purple">
                    Sell
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </Stack>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

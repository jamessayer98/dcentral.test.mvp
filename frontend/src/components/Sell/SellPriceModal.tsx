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
import { Controller, useForm } from "react-hook-form";

type Props = {};

export const SellPriceModal = (props: Props) => {
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

  const onSubmit = (values) => {
    console.log(values);
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
            <Button onClick={onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

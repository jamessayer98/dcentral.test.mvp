import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggeler from "../theme/ThemeToggler";

export const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      toast({
        title: `Logged in as ${values.email}`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: `Invalid email or password`,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mt={6}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              variant="filled"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This filed is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              variant="filled"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This filed is required",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Logging in..."
            width="100%"
            colorScheme="purple"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Login
          </Button>
        </form>
        <ThemeToggeler showLabel={true} />
        <Button
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
          onClick={() => navigate("/register", { replace: true })}
        >
          Register Instead
        </Button>
      </Flex>
    </Flex>
  );
};

import { Button, useToast } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from "../../services/axios";

function GoogleButton() {
  const { googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (error) => console.log(error),
    scope: "profile email",
    flow: "auth-code",
  });
  const handleSuccess = (response: any) => {
    if ("code" in response) {
      const code = response.code;
      setIsLoading(true);
      axiosInstance
        .post("/v1/auth/google", { code })
        .then((res) => {
          const { user, tokens } = res.data;
          googleLogin(user, tokens);
          toast({
            title: `Logged in as ${user.email}`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch((err) => {
          toast({
            title: `Something went wrong. Please try again`,
            status: "error",
            isClosable: true,
            duration: 1500,
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Button
      leftIcon={<FcGoogle />}
      onClick={() => login()}
      isLoading={isLoading}
      width="100%"
      colorScheme="purple"
      variant="outline"
      mb={6}
    >
      Google
    </Button>
  );
}

export default GoogleButton;

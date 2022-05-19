import { Button, useToast } from "@chakra-ui/react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import { axiosOpenInstance } from "../../services/axios";

function GoogleButton() {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const { googleLogin } = useAuth();
  const toast = useToast();
  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("success");
    if ("accessToken" in response) {
      const accessToken = response.accessToken;
      axiosOpenInstance
        .post("/v1/auth/google", { accessToken })
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
        });
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={handleSuccess}
      onFailure={(err) => {
        console.log(err);
        // toast({
        //   title: `Something went wrong. Please try again`,
        //   status: "error",
        //   isClosable: true,
        //   duration: 1500,
        // });
      }}
      scope="profile email"
      cookiePolicy="single_host_origin"
      render={(renderProps) => (
        <Button
          leftIcon={<FcGoogle />}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled || !clientId}
          width="100%"
          colorScheme="purple"
          variant="outline"
          mb={6}
          type="submit"
        >
          Google
        </Button>
      )}
    />
  );
}

export default GoogleButton;

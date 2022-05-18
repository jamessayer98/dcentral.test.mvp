import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ColorModeSwitcher } from "../theme/ColorModeSwitcher";

export const Navbar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <Box minHeight="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={useColorModeValue("purple.300", "purple.400")}
        color="white"
      >
        <Text as="h2" fontSize={24} fontWeight="bold">
          DECENTRAL
        </Text>
        <Stack direction="row" align="center" spacing={4}>
          <ColorModeSwitcher />
          <Button onClick={logout} colorScheme="purple">
            Logout
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};

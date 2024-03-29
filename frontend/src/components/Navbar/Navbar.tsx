import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiFillDownCircle } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ColorModeSwitcher } from "../theme/ColorModeSwitcher";
import { WalletButton } from "../wallet-button";

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
      >
        <Link to="/">
          <Text as="h2" fontSize={24} fontWeight="bold">
            DCENTRAL
          </Text>
        </Link>
        <Stack direction="row" align="center" spacing={4}>
          <ColorModeSwitcher />
          <Menu>
            <WalletButton />
            <MenuButton as={Button} rightIcon={<AiFillDownCircle />} colorScheme="purple">
              Profile
            </MenuButton>
            <MenuList>
              <Link to="my-collection"><MenuItem>My Collection</MenuItem></Link>
              <Link to="/u/profile"><MenuItem>Profile</MenuItem></Link>
            </MenuList>
          </Menu>
          <Button onClick={logout} colorScheme="purple">
            Logout
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};

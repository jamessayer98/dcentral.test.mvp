import { Avatar, Box, Container, Heading, Stack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

type Props = {};

export const Profile = (props: Props) => {
  const { user } = useAuth();
  return (
    <Container my={3}>
      <Box backgroundColor="gray.600" p={3} borderRadius={10}>
        <Stack align="center">
          <Avatar
            size="2xl"
            name={user.username}
            src="https://bit.ly/sage-adebayo"
          />
          <Heading as="h6" size="md" my={3}>{user.email}</Heading>
        </Stack>
      </Box>
    </Container>
  );
};

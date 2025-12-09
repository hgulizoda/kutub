import { Outlet } from "react-router-dom";
import UserProfileAside from "./UserProfileAside";
import { Box, Container, Flex } from "@mantine/core";

const UserLayout = () => {
  return (
    <>
      <Container size={1600} p={0}>
        <Flex gap={30}>
          <UserProfileAside />
          <Box w="25%"></Box>
          <Box w="75%" style={{ justifySelf: "end" }}>
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default UserLayout;

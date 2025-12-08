import { Box, Flex, Stack, Text } from "@mantine/core";
import useAuthStore from "../store/useAuthStore";
import {
  IconBook,
  IconBooks,
  IconCircle,
  IconHome,
  IconLibrary,
  IconLogout,
  IconSettings,
  IconUserFilled,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const UserProfileAside = () => {
  const { user, logOut } = useAuthStore();
  console.log(user);
  const navigate = useNavigate();

  return (
    <>
      <Box
        w="25%"
        h="100vh"
        bg="rgba(72, 130, 123, 0.13)"
        pt={100}
        style={{
          borderRadius: "8px",
          padding: "30px 20px",
        }}
      >
        <Stack align="center">
          <Box
            bg="gray"
            p={5}
            style={{
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            w={80}
            h={80}
          >
            <IconUserFilled color="white" cursor="pointer" size="50px" />
          </Box>
          <Text mb={40} fz="h2" fw={500} c="rgba(80, 83, 82, 1)">
            {user?.user.name}
          </Text>
          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"rgba(81, 80, 79, 1)"}
          >
            <IconBook />
            <Text
              component={Link}
              to="/profile/my_books"
              style={{ paddingTop: "2px" }}
            >
              My Books
            </Text>
          </Flex>

          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"rgba(81, 80, 79, 1)"}
          >
            <IconSettings />
            <Text component={Link} to="/" style={{ paddingTop: "2px" }}>
              Profile Settings
            </Text>
          </Flex>

          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"rgba(81, 80, 79, 1)"}
            style={{ borderTop: "1px solid rgba(103, 101, 100, 0.26)" }}
            pt={20}
            mt={20}
          >
            <IconHome />
            <Text component={Link} to="/" style={{ paddingTop: "2px" }}>
              Home
            </Text>
          </Flex>

          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"rgba(81, 80, 79, 1)"}
          >
            <IconBooks />
            <Text
              component={Link}
              to="/profile/my_books"
              style={{ paddingTop: "2px" }}
            >
              All Books
            </Text>
          </Flex>

          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"rgba(81, 80, 79, 1)"}
          >
            <IconLibrary />
            <Text
              component={Link}
              to="/libraries"
              style={{ paddingTop: "2px" }}
            >
              All Libraries
            </Text>
          </Flex>

          <Flex
            align="start"
            gap={10}
            justify="start"
            w="80%"
            c={"red"}
            mt={250}
            onClick={() => {
              navigate("/");
              logOut();
            }}
          >
            <IconLogout />
            <Text component={Link} to="/libraries">
              Log Out
            </Text>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default UserProfileAside;

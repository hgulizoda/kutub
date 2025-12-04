import { Flex, Text, Container, Button } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { IconSun } from "@tabler/icons-react";
import { Select } from "@mantine/core";
const Header = ({ color }) => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        color: { color },
      }}
    >
      <Container
        size="xl"
        py="lg"
        component="header"
        pos="absolute"
        w="100%"
        mx="auto"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 9999,
        }}
      >
        <Flex justify="space-between" align="center">
          <Text fw="600" c={color} onClick={() => navigate("/")}>
            KUTUB
          </Text>
          <Flex gap="sm" align="center">
            <Flex gap="lg" component="nav">
              <NavLink to="/books" style={{ color: color }}>
                Books
              </NavLink>
              <NavLink to="/libraries" style={{ color: color }}>
                Libraries
              </NavLink>
            </Flex>

            {/* <Select
              defaultValue={"O'zbek"}
              data={["O'zbek", "English"]}
              styles={{
                input: {
                  border: "none",
                  borderRadius: "8px",
                  width: "100px",
                },
              }}
            /> */}

            {/* <IconSun /> */}
            <Button>Log in</Button>
            <Button>Sign in</Button>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;

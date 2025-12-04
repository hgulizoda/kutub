import { Flex, Text, Container, Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { IconSun } from "@tabler/icons-react";
import { Select } from "@mantine/core";
import "flag-icons/css/flag-icons.min.css";
const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
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
          <Text fw="600">KUTUB</Text>
          <Flex gap="sm" align="center">
            <Flex gap="lg" component="nav">
              <NavLink>Books</NavLink>
              <NavLink>Libraries</NavLink>
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

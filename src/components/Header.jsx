import { Flex, Text, Container, Button, Box, Image } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { IconSun, IconUserFilled, IconWorld } from "@tabler/icons-react";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { API } from "../api/api";
import uzb from "../assets/images/uzb.png";
import uk from "../assets/images/uk.png";

const Header = ({ color }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState("uz");
  console.log(value);

  console.log(value);
  const { auth, user } = useAuthStore();

  console.log(user);

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
          zIndex: 999999,
        }}
      >
        <Flex justify="space-between" align="center">
          <Text fw="600" c={color} onClick={() => navigate("/")}>
            KUTUB
          </Text>
          <Flex gap="sm" align="center">
            <Flex gap="lg" component="nav">
              <NavLink to="/books" style={{ color: color }}>
                {t("header.books")}
              </NavLink>
              <NavLink to="/libraries" style={{ color: color }}>
                {t("header.libraries")}
              </NavLink>
              {auth ? (
                <>
                  <Text c={color}>|</Text>
                  <NavLink style={{ color: color }}>Kitoblarim</NavLink>
                  <NavLink style={{ color: color }}>Saqlanganlar</NavLink>
                </>
              ) : (
                ""
              )}
            </Flex>
            <Flex gap={5} align="center" ml={20}>
              <Image src={value == "uz" ? uzb : uk} w={25} h={25} />

              <Select
                w={100}
                p={0}
                rightSectionWidth={0}
                rightSection={null}
                withCheckIcon={false}
                styles={{
                  input: {
                    backgroundColor: "transparent",
                    color: color,
                    border: "none",
                    padding: 0,
                  },

                  dropdown: {
                    width: "400px",
                  },
                }}
                data={[
                  { value: "uz", label: "O'zbek" },
                  { value: "eng", label: "English" },
                ]}
                value={value}
                onChange={(val) => {
                  setValue(val);
                  i18n.changeLanguage(val);
                }}
              />
            </Flex>

            {auth ? (
              <Flex
                gap={10}
                align="center"
                onClick={() => navigate("/profile")}
                cursor="pointer"
              >
                <Text
                  c={color}
                  fw="700"
                  ml="100px"
                  style={{ cursor: "pointer" }}
                >
                  {user?.user.name}
                </Text>
                <Box
                  bg="gray"
                  p={5}
                  style={{ borderRadius: "50%" }}
                  w={35}
                  h={35}
                >
                  <IconUserFilled color="white" cursor="pointer" />
                </Box>
              </Flex>
            ) : (
              <Button onClick={() => navigate("/login")}>
                {t("header.logIn")}
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;

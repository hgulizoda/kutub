import { Flex, Text, Container, Button } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { IconSun } from "@tabler/icons-react";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api/api";

const Header = ({ color }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState("uz");
  function handleLangChange(e) {
    i18n.changeLanguage(e.target.value);
  }

  console.log(value);
  const { tokens, auth, setUser, user } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["user", tokens?.access],
    queryFn: async () => {
      const res = await API.get("/auth/profile/", {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      setUser(res.data);
    },
  });

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
                {t("header.books")}
              </NavLink>
              <NavLink to="/libraries" style={{ color: color }}>
                {t("header.libraries")}
              </NavLink>
            </Flex>
            {/* <Select
              withAlignedLabels
              checkIconPosition="left"
              value={value}
              onChange={(e) => {
                handleLangChange(e), setValue(e.target.value);
              }}
              data={[
                { value: "en", label: "English" },
                { value: "uz", label: "O'zbek" },
              ]}
              style={{ color: "black" }}
            /> */}
            {auth ? (
              <Text
                c="white"
                fw="700"
                ml="100px"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile/my_books")}
              >
                {user?.user.name}
              </Text>
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

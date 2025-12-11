import {
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  Paper,
  TextInput,
  Button,
  PasswordInput,
} from "@mantine/core";
import { motion } from "framer-motion";

import jkrowling from "../assets/images/jkrowling.jpg";
import dostoyevskiy from "../assets/images/dostoyevskiy.jpg";
import cholpon from "../assets/images/cho'lpon.jpg";
import mess from "../assets/images/mess.jpg";
import abdullaQodiriy from "../assets/images/abdulla qodiriy.jpg";
import lib1 from "../assets/images/lib1.jpg";
import lib2 from "../assets/images/lib2.jpg";
import atomicHabits from "../assets/images/atomic habits.jpg";
import catcher from "../assets/images/catcher.jpg";
import otkirx from "../assets/images/o'tkir xoshimov.jpg";
import { Carousel } from "@mantine/carousel";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";

const images = [
  abdullaQodiriy,
  lib1,
  dostoyevskiy,
  mess,
  jkrowling,
  cholpon,
  atomicHabits,
  lib2,
  otkirx,
  catcher,
];

const MotionImg = motion.img;

const LoginPage = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const autoplay2 = useRef(Autoplay({ delay: 3000 }));
  const autoplay3 = useRef(Autoplay({ delay: 4000 }));
  const { logIn } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);
    mutation.mutate(newData);
  }
  const mutation = useMutation({
    mutationFn: async ({ phone, password }) => {
      const { data: tokens1 } = await API.post("/auth/login/", {
        phone,
        password,
      });

      const { data: user1 } = await API.get("/auth/profile/", {
        headers: { Authorization: `Bearer ${tokens1.access}` },
      });

      return { tokens1, user1 };
    },

    onSuccess: (data) => {
      logIn(data);

      navigate("/");
    },

    onError: () => {
      setError("Invalid username or password");
    },
  });

  return (
    <Container size="1600px" p="xl" h="100vh" px="50px">
      <Flex
        align="center"
        gap="xl"
        justify="center"
        wrap="nowrap"
        w="100%"
        h="100%"
      >
        <Stack w="50%" pos="relative">
          <Carousel
            height={200}
            slideSize="25%"
            slideGap="md"
            withControls={false}
            plugins={[autoplay.current]}
            emblaOptions={{ loop: true, align: "start", slidesToScroll: 3 }}
          >
            {images.slice(0, 7).map((image) => (
              <Carousel.Slide key={image}>
                <img
                  src={image}
                  width="100%"
                  height="100%"
                  alt=""
                  style={{
                    objectPosition: "center",
                    objectFit: "cover",
                    borderRadius: "8px",
                    opacity: "0.7",
                  }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
          <Carousel
            height={200}
            slideSize="25%"
            slideGap="md"
            withControls={false}
            plugins={[autoplay2.current]}
            emblaOptions={{ loop: true, align: "start", slidesToScroll: 3 }}
          >
            {images.slice(0, 7).map((image) => (
              <Carousel.Slide key={image}>
                <img
                  src={image}
                  width="100%"
                  height="100%"
                  alt=""
                  style={{
                    objectPosition: "center",
                    objectFit: "cover",
                    borderRadius: "8px",
                    opacity: "0.1",
                  }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
          <Stack pos="absolute" top="35%" left="10%">
            <Text c="teal" fz="70px" fw="700">
              Kutub
            </Text>
            <Text fz="md" c="rgba(62, 66, 65, 1)">
              Explore libraries, books and authors with us
            </Text>
          </Stack>
          <Carousel
            height={200}
            slideSize="25%"
            slideGap="md"
            withControls={false}
            plugins={[autoplay3.current]}
            emblaOptions={{
              loop: true,
              align: "start",
              slidesToScroll: 2,
            }}
          >
            {images.slice(0, 7).map((image) => (
              <Carousel.Slide key={image}>
                <img
                  src={image}
                  width="100%"
                  height="100%"
                  alt=""
                  style={{
                    objectPosition: "center",
                    objectFit: "cover",
                    borderRadius: "8px",
                    opacity: "0.7",
                  }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>

        <Stack w="50%" gap="20px" spacing="20px" align="center">
          <Paper
            p="xl"
            w="80%"
            bg="transparent"
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack>
              <Text fz={28} fw={700} c="teal.7">
                Kirish
              </Text>

              <TextInput
                label="Telefon raqam"
                placeholder="+998 90 123 45 67"
                radius="md"
                size="md"
                name="phone"
                my="30px 10px"
                styles={{
                  input: { border: "none" },
                  label: { color: "teal" },
                }}
              />

              <PasswordInput
                label="Parol"
                placeholder="Parolingiz"
                radius="md"
                size="md"
                name="password"
                styles={{
                  input: { border: "none" },
                  label: { color: "teal" },
                }}
              />

              <Text c="gray " mb="lg">
                Kutubxonachi bo'lmoqchimisiz?{" "}
                <Link to="/signUp">Ro'yxatdan o'ting</Link>
              </Text>

              <Button
                fullWidth
                size="md"
                radius="md"
                color="teal"
                mt="sm"
                type="submit"
                style={{ fontWeight: 600 }}
              >
                Kirish
              </Button>
              {error ? <Text c="red">{error.message}</Text> : ""}
            </Stack>
          </Paper>
        </Stack>
      </Flex>
    </Container>
  );
};

export default LoginPage;

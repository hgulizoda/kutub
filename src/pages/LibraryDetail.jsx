import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../api/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { librariesImages } from "../constants/libs";
import BooksCardGrid from "../components/BooksCardGrid";
import PopularLibraries from "../components/PopularLibraries";
import {
  IconMapPinFilled,
  IconBooks,
  IconBookFilled,
  IconPhone,
  IconBrandFacebookFilled,
  IconBrandTelegram,
  IconBrandInstagram,
  IconArrowBigLeftFilled,
  IconLocationShare,
  IconArrowDownRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { useState } from "react";

const LibraryDetail = () => {
  const { libraryID, libraryName } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["library", libraryID],
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${libraryID}`);
      return res.data;
    },
  });

  const library = data?.results;
  console.log(library);

  return (
    <>
      <Container
        size="xl"
        mt="100px"
        pos="relative"
        w="100%"
        style={{ overflow: "hidden" }}
      >
        <Image
          radius="md"
          h={500}
          w="100%"
          src={librariesImages[Math.floor(libraryID % 4)]}
          fit="cover"
        />

        <Stack pos="absolute" top={340} left={70} style={{ zIndex: "12" }}>
          <Text fz="h1" c="white" fw={700}>
            {libraryName}
          </Text>
          <Rating value={3.5} fractions={2} readOnly />
          <Flex>
            <IconMapPinFilled color="white" />
            <Text fz="md" c="white" fw={700}>
              {library?.library.address}
            </Text>
          </Flex>
        </Stack>

        <Box
          h="500"
          w="97.5%"
          top={0}
          bottom={0}
          pos="absolute"
          style={{
            borderRadius: "8px",
            padding: "5px 30px",
            zIndex: "1",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.33), rgba(5, 5, 5, 0.52))",
          }}
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        ></Box>

        <Button
          pos="absolute"
          style={{ zIndex: "879" }}
          top={40}
          right={60}
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          {open ? "Close" : "More"}
        </Button>

        <Button
          pos="absolute"
          bg="rgba(255, 255, 255, 0.35)"
          style={{ zIndex: "879" }}
          top={40}
          left={60}
          onClick={() => navigate(-1)}
        >
          <IconArrowBigLeftFilled />
        </Button>

        <Button
          pos="absolute"
          top="400px"
          right={100}
          w={180}
          c={open ? "teal" : "white"}
          bg="transparent"
          style={{ zIndex: "123987", transition: "all 0.5s ease-in-out" }}
          onClick={() =>
            (window.location.href = `${library.library.google_maps_url}`)
          }
        >
          Google maps
          <IconArrowUpRight style={{ marginLeft: "10px" }} />
        </Button>

        <Box
          pos="absolute"
          style={{
            zIndex: "45",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transform: `translateX(${open ? "0" : "1000px"})`,
            transition: "all 0.5s ease-in-out",
            background:
              "linear-gradient(to right, rgba(255,255,255,0) 10%, rgba(255, 255, 255, 0.78),  rgba(255, 255, 255, 0.82) ,  rgba(255, 255, 255, 0.65)  )",
          }}
          h={500}
          w={750}
          top={0}
          right={15}
          p={20}
          pl={300}
        >
          <Text fz="h2" c="teal" fw={700} ml={30} mt={20}>
            Kutubxona ma'lumotlari:
          </Text>

          <Stack p={40}>
            <Flex gap={10}>
              <IconBookFilled color="teal" />
              <Text c="rgba(59, 61, 58, 1)">
                Kitoblar soni: {library?.total_books}
              </Text>
            </Flex>
            <Flex gap={15}>
              <IconMapPinFilled size="20px" color="teal" />
              <Text
                component="a"
                href={library?.library.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
                w={350}
                c="rgba(59, 61, 58, 1)"
              >
                Manzil: {library?.library.address}
              </Text>
            </Flex>

            <Flex gap={10} mb={30}>
              <IconPhone color="teal" />
              <Text c="rgba(59, 61, 58, 1)">Telefon: {library?.phone}</Text>
            </Flex>
            <Flex gap={20}>
              {library?.library.social_media.instagram ? (
                <a
                  href={`https://www.instagram.com/${library?.library.social_media.instagram}`}
                  target="blank"
                  style={{
                    color:
                      "linear-gradient(45deg, #f58529, #feda77, #dd2a7b, #8134af, #515bd4)",
                  }}
                >
                  <IconBrandInstagram color="#E1306C" />
                </a>
              ) : (
                ""
              )}

              {library?.library.social_media.facebook ? (
                <a
                  href={`https://www.facebook.com/${library?.library.social_media.facebook}`}
                  target="blank"
                  style={{ color: "rgba(45, 78, 150, 1)" }}
                >
                  <IconBrandFacebookFilled />
                </a>
              ) : (
                ""
              )}
              {library?.library.social_media.telegram ? (
                <a
                  href={`https://www.telegram.com/${library?.library.social_media.telegram}`}
                  target="blank"
                  style={{ color: "rgba(68, 117, 223, 1)" }}
                >
                  <IconBrandTelegram />
                </a>
              ) : (
                ""
              )}
            </Flex>
          </Stack>
        </Box>

        <Flex
          align="center"
          c="rgba(75, 78, 77, 1)"
          gap="sm"
          fz="h1"
          mb={30}
          mt={30}
        >
          <IconBooks color="rgba(123, 210, 200, 1)" />
          <Text fz="h2" fw="700">
            Kutubxonada
            {library?.books.length
              ? " mavjud kitoblar"
              : " kitoblar mavjud emas"}
          </Text>
        </Flex>
        <Grid my={50}>
          {library?.books.length
            ? library?.books.map((book) => (
                <Grid.Col key={book.id} span={2.3} pos="relative">
                  <BooksCardGrid {...book} />
                  <Flex
                    pos="absolute"
                    top={20}
                    left={30}
                    style={{
                      backgroundColor: "rgba(21, 159, 115, 0.65)",
                      color: "white",
                      padding: "2px 15px",
                      borderRadius: "18px",
                    }}
                  >
                    {book.quantity_in_library} ta
                  </Flex>
                </Grid.Col>
              ))
            : ""}
        </Grid>

        <PopularLibraries />
      </Container>
    </>
  );
};

export default LibraryDetail;

import PopularBooks from "../components/PopularBooks";
import homevideo from "../assets/homevideo.mp4";
import {
  Container,
  Flex,
  Stack,
  Input,
  Text,
  Button,
  ScrollArea,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import PopularLibraries from "../components/PopularLibraries";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { useState } from "react";
import SearchCard from "../components/SearchCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [bookName, setBookName] = useState("");
  const { data: searchData } = useQuery({
    queryKey: ["searched", bookName],
    queryFn: async () => {
      const res = await API.get(`/books/search/book/?q=${bookName}`);
      return res.data;
    },
    enabled: !!bookName,
  });

  console.log(bookName);
  console.log(searchData);

  return (
    <>
      <Header color="white" />
      <Stack w="100%">
        <Container
          size="2200px"
          w="100%"
          p="0"
          h="700px"
          style={{ overflow: "hidden" }}
        >
          <video
            src={homevideo}
            autoPlay
            width="100%"
            height="700px"
            loop
            muted
            style={{
              objectFit: "cover",
              zIndex: "-4",
            }}
          ></video>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "700px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
            }}
          />
        </Container>
        <Stack
          w="100%"
          justify="space-between"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 8492831,
            alignItems: "center",
            textAlign: "center",
            color: "white",
            marginBottom: "100px",
          }}
        >
          <Stack
            align="center"
            justify="center"
            spacing="sm"
            style={{
              width: "100%",
              textAlign: "center",
              color: "white",
              position: "relative",
              zIndex: 1,
              marginBottom: "200px",
            }}
          >
            <Text
              fz={50}
              fw={700}
              style={{
                textShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              Kutub
            </Text>

            <Text
              fz="lg"
              fw={500}
              style={{
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
                color: "#bebabaff",
              }}
            >
              Search Books by name or author...
            </Text>

            <Flex
              mt="md"
              style={{
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Input
                placeholder="Search for books, authors, or libraries..."
                icon={<IconSearch size={20} />}
                radius="xl"
                size="lg"
                w="75%"
                value={bookName}
                onChange={(e) => setBookName(e.currentTarget.value)}
                styles={{
                  input: {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "none",
                    paddingLeft: 20,
                    color: "#333",
                    fontWeight: 500,
                  },
                }}
              />
              <Button
                ml="sm"
                radius="xl"
                size="lg"
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Search
              </Button>
            </Flex>
            {bookName ? (
              <ScrollArea
                style={{
                  width: "50%",
                  position: "absolute",
                  top: "120%",

                  height: "300px",
                  margin: "0 auto",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#cccccc3b",
                }}
              >
                <Stack spacing="0" gap="0">
                  {searchData?.map((book, index) => (
                    <SearchCard
                      key={index}
                      name={book.name}
                      author={book.author}
                      publisher={book.publisher}
                    />
                  ))}
                </Stack>
              </ScrollArea>
            ) : (
              ""
            )}
          </Stack>
        </Stack>

        <PopularBooks />

        <PopularLibraries />
      </Stack>
      <Footer />
    </>
  );
};

export default Home;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API } from "../api/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Rating,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { bookImages } from "../constants/books";
import {
  IconArrowBigLeft,
  IconArrowBigRight,
  IconArrowRight,
  IconBook,
  IconHome,
  IconLibraryFilled,
  IconNumber,
} from "@tabler/icons-react";
import axios from "axios";
import CommentsCard from "../components/CommentsCard";
import PopularBooks from "../components/PopularBooks";
import LibraryCardList from "../components/LibraryCardList";

const BookDetail = () => {
  const { bookID } = useParams();

  const { data: book } = useQuery({
    queryKey: ["bookDetail", bookID],
    queryFn: async () => {
      const res = await API.get(`/books/book/${bookID}/`);
      return res.data;
    },
  });

  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/comments");
      return res.data;
    },
  });

  const comments = data?.comments;

  const { data: list } = useQuery({
    queryKey: ["available_in", bookID],
    queryFn: async () => {
      const res = await API.get(`/books/search/book/?q=${book.name}`);
      return res.data;
    },
  });

  const { data: libraries } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await API("/libraries/libraries/");
      return res.data;
    },
  });

  const libraryName = libraries?.find((l) => l.id === book?.library);

  const available_in = list?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.library.id === item.library.id)
  );

  return (
    <>
      <Container size="xl" my={100}>
        <Flex gap={100} pos={"relative"} mb={100}>
          <Image
            src={bookImages[Math.floor(bookID % 7)]}
            w="30%"
            style={{
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          <Rating
            pos={"absolute"}
            bottom={30}
            left={30}
            value={Math.floor(bookID % 5) + 1}
          />

          <Box
            sx={(theme) => ({
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.teal[0],
            })}
          >
            <Text fz="xl" weight={700} mb="lg" color="teal.7">
              Kitob haqida:
            </Text>

            <Stack spacing="sm">
              <Group>
                <ThemeIcon color="teal" variant="light">
                  <IconBook size={20} />
                </ThemeIcon>
                <Text weight={500}>Kitob nomi: {book?.name}</Text>
              </Group>

              <Group>
                <ThemeIcon color="teal" variant="light">
                  <IconLibraryFilled size={20} />
                </ThemeIcon>
                <Text weight={500}>Nashriyot nomi: {book?.publisher}</Text>
              </Group>

              <Group>
                <ThemeIcon color="teal" variant="light">
                  <IconHome size={20} />
                </ThemeIcon>
                <Text weight={500}>Kutubxona: {libraryName?.name}</Text>
              </Group>

              <Group>
                <ThemeIcon color="teal" variant="light">
                  <IconNumber size={20} />
                </ThemeIcon>
                <Text weight={500}>
                  Ma'lum kutubxonadagi soni: {book?.quantity_in_library} ta
                </Text>
              </Group>
            </Stack>

            <Stack gap={0} mt={50} align="end">
              <Button variant="subtle">
                see more <IconArrowRight />
              </Button>
              <Flex style={{ display: "flex" }} gap={10}>
                {comments?.slice(0, 3).map((c) => (
                  <CommentsCard key={c.id} {...c} />
                ))}
              </Flex>
            </Stack>
          </Box>
        </Flex>
        <Stack mb={50}>
          <Text fz="h2" fw={600} ml={20}>
            Available in:
          </Text>
          {available_in?.map((lib) => (
            <LibraryCardList key={lib.id} {...lib} name={libraryName.name} />
          ))}
        </Stack>
        <PopularBooks />
      </Container>
    </>
  );
};

export default BookDetail;

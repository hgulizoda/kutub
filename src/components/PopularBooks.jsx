import { Carousel } from "@mantine/carousel";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Autoplay from "embla-carousel-autoplay";
import BooksCardGrid from "./BooksCardGrid";
import { Stack, Text, Container, Flex, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function PopularBooks() {
  const { data: books, isPending } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books");
      return res.data;
    },
  });

  const navigate = useNavigate();

  return (
    <Stack>
      <Container size="xl">
        <Flex justify="space-between" mb="lg">
          <Text fz="h2" fw="500">
            Popular Books
          </Text>
          <Button variant="transparent" onClick={() => navigate("/books")}>
            See All <IconArrowRight />
          </Button>
        </Flex>
        <Carousel
          withIndicators
          pb="50px"
          slideSize="20%"
          slideGap="md"
          emblaOptions={{ loop: true, align: "start", slidesToScroll: 4 }}
          plugins={[Autoplay({ delay: 3000 })]}
        >
          {books?.map((book) => (
            <BooksCardGrid key={book.id} {...book} />
          ))}
        </Carousel>
      </Container>
    </Stack>
  );
}

export default PopularBooks;

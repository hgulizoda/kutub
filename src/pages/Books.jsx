import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { Container, Flex, Grid } from "@mantine/core";
import BooksCardGrid from "../components/BooksCardGrid";

const Books = () => {
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res.data;
    },
  });
  return (
    <>
      <Container size="xl" mt="100px">
        <Flex justify="space-between">
          <h1>Books</h1>
        </Flex>

        <Grid>
          {books?.map((book) => (
            <Grid.Col key={book.id} span={2.4}>
              <BooksCardGrid {...book} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Books;

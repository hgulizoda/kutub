import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { Button, Container, Flex, Grid, Input } from "@mantine/core";
import BooksCardGrid from "../components/BooksCardGrid";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const Books = () => {
  const [searchData, setSearchData] = useState("");
  const { t } = useTranslation();
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res.data;
    },
  });

  const filteredData = books?.filter(
    (book) => book.name.includes(searchData) || book.author.includes(searchData)
  );
  return (
    <>
      <Container size="xl" mt="100px">
        <Flex justify="space-between" align="center">
          <h1>{t("header.books")}</h1>
          <Flex>
            <Input
              placeholder="search books by name or author"
              styles={{
                input: {
                  borderRadius: "8px",
                  border: "none",
                  width: "300px",
                },
              }}
            />
            <Button>
              <IconSearch />
            </Button>
          </Flex>
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

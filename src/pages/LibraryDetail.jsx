import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import BooksCardGrid from "../components/BooksCardGrid";
import { Container, Text, Stack } from "@mantine/core";

const LibraryDetail = () => {
  const { libraryID } = useParams();
  const { tokens } = useAuthStore();

  const { data: library } = useQuery({
    queryKey: ["library", libraryID],
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${libraryID}/`, {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      return res.data;
    },
    enabled: !!tokens?.access,
  });

  const { data: books = [] } = useQuery({
    queryKey: ["libraryBooks", libraryID],
    queryFn: async () => {
      const res = await API.get(`libraries/${libraryID}/books/`, {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      return res.data;
    },
    enabled: !!tokens?.access,
  });

  console.log(library);

  return (
    <Container size="xl" py="md">
      <Stack spacing="md">
        <Text fz={32} fw={700}>
          {library.name}
        </Text>
        <Text c="gray">{library.address}</Text>
        <Text c="dimmed">{library.description}</Text>

        <Text fz={24} fw={600} mt="md">
          Books in this library
        </Text>
        {books.length === 0 ? (
          <Text>No books found in this library.</Text>
        ) : (
          <Stack spacing="sm">
            {books.map((book) => (
              <BooksCardGrid key={book.id} {...book} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default LibraryDetail;

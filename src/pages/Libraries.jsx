import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { Container, Flex, Grid } from "@mantine/core";
import BooksCardGrid from "../components/BooksCardGrid";
import LibraryCardGrid from "../components/LibraryCardGrid";

const Libraries = () => {
  const { data: libraries } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res.data;
    },
  });
  return (
    <>
      <Container size="xl" mt="100px">
        <Flex justify="space-between">
          <h1>Libraries</h1>
        </Flex>

        <Grid>
          {libraries?.map((library) => (
            <Grid.Col key={library.id} span={6}>
              <LibraryCardGrid {...library} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Libraries;

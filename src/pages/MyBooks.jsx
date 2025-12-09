import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import BooksCardGrid from "../components/BooksCardGrid";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Modal,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import ExcelDropzone from "../components/Dropzone";
import queryClient from "../api/queryClient";
import { useDisclosure } from "@mantine/hooks";
import AddSingleBook from "../components/AddSingleBook";
import { useState } from "react";
const MyBooks = () => {
  const { tokens } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [addType, setAddType] = useState("");
  const [next, setNext] = useState(false);

  const [number, setNumber] = useState("");

  const { data: myBooks } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await API.get("/libraries/library/books", {
        headers: { Authorization: `Bearer ${tokens?.access}` },
      });
      return res.data;
    },
    enabled: !!tokens?.access,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await API.delete(`/books/book/${id}/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
    },
  });

  const mutation = useMutation({
    queryFn: async (id) => {
      const res = await API.get(`/books/book/${id}/`);
      return res.data;
    },
  });

  return (
    <>
      <Stack w="100%" mt={50}>
        <Text fz={"h1"} fw={600} c={"rgba(57, 58, 58, 1)"}>
          My Books
        </Text>
        <Grid>
          <GridCol span={2.9}>
            <Box
              style={{
                padding: "20px 25px 40px",
                borderRadius: "8px",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Box style={{ cursor: "pointer" }}>
                <ExcelDropzone />
              </Box>

              <Button
                mt={40}
                onClick={() => {
                  open(), setAddType("single");
                }}
              >
                <Flex gap={10} align="center">
                  <IconPlus size={20} />
                  <Text>Add book</Text>
                </Flex>
              </Button>

              <Button
                mt={5}
                onClick={() => {
                  open();
                  setAddType("multiple");
                }}
              >
                <Flex gap={10} align="center">
                  <IconPlus size={20} />
                  <Text>Add multiple books</Text>
                </Flex>
              </Button>
            </Box>
          </GridCol>
          {myBooks?.map((book) => (
            <Grid.Col span={2.9} key={book.id} pos={"relative"}>
              <BooksCardGrid {...book} />
              <Flex pos={"absolute"} top={20} right={30} gap={10}>
                <Button
                  bg="rgba(252, 252, 252, 1)"
                  onClick={() => deleteMutation.mutate(book.id)}
                >
                  <IconTrash color="red" size={20} />
                </Button>
                <Button
                  bg="rgba(252, 252, 252, 1)"
                  onClick={() => mutation.mutate(book.id)}
                >
                  <IconEdit color="orange" size={20} />
                </Button>
              </Flex>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      <Modal opened={opened} onClose={close} title="Add">
        {addType === "single" || next ? (
          <AddSingleBook initial={{}} number={number} />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNumber(e.target[0].value);
              setNext(true);
            }}
          >
            <Stack>
              <NumberInput
                label="Number of Books"
                placeholder="Enter number"
                min={1}
                max={10}
                required
              />

              <Button type="submit">Next</Button>
            </Stack>
          </form>
        )}
      </Modal>
    </>
  );
};

export default MyBooks;

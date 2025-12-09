import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import queryClient from "../api/queryClient";

const AddSingleBook = ({ initial, editId }) => {
  const { tokens } = useAuthStore();
  const form = useForm({
    initialValues: {
      name: initial?.name || "",
      author: initial?.author || "",
      publisher: initial?.publisher || "",
      quantity_in_library: initial?.quantity_in_library || 1,
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const newBook = {
      name: e.target[0].value,
      author: e.target[1].value,
      publisher: e.target[2].value,
      quantity_in_library: e.target[3].value,
    };

    const arr = [];
    arr.push(newBook);

    mutation.mutate(arr);
  }

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log("Token being sent:", tokens?.access);

      return await API.post("/books/add-books/", data, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
          "Content-Type": "application/json",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
    },
    onError: (error) => {
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Book name"
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Author"
            placeholder="Author name"
            required
            {...form.getInputProps("author")}
          />

          <TextInput
            label="Publisher"
            placeholder="Publisher name"
            required
            {...form.getInputProps("publisher")}
          />

          <NumberInput
            label="Quantity in Library"
            placeholder="Amount"
            min={1}
            required
            {...form.getInputProps("quantity_in_library")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">{editId ? "Save" : "Add"}</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default AddSingleBook;

import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import queryClient from "../api/queryClient";
import useModalStore from "../store/useModalControl";
import { useState } from "react";

const AddSingleBook = ({ initial, number }) => {
  const { tokens } = useAuthStore();
  const [quantity, setQuantity] = useState(number);
  const [collectedData, setCollectedData] = useState([]);
  const { close } = useModalStore();

  const form = useForm({
    initialValues: {
      name: initial?.name || "",
      author: initial?.author || "",
      publisher: initial?.publisher || "",
      quantity_in_library: initial?.quantity_in_library || 1,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await API.post("/books/add-books/", data, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
      close();
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newBook = { ...form.values };
    const updatedData = [...collectedData, newBook];

    setCollectedData(updatedData);

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    if (newQuantity === 0) {
      mutation.mutate(updatedData);
    } else {
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Text size="sm" c="dimmed">
          Book {collectedData.length + 1} of {number}
        </Text>

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
          <Button type="submit">{newQuantity === 0 ? "Finish" : "Next"}</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default AddSingleBook;

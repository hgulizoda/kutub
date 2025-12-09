import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Text, Group } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import queryClient from "../api/queryClient";

function ExcelDropzone() {
  const { tokens } = useAuthStore();
  const mutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("/books/upload-excel/", formData, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (booksArr) => {
      queryClient.invalidateQueries(["myBooks"]);
      addBooksMutation.mutate(booksArr);
    },
  });

  const addBooksMutation = useMutation({
    mutationFn: async (booksArray) => {
      return await API.post("/books/add-books/", booksArray, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
    },
  });

  const handleDrop = (files) => {
    const file = files[0];
    mutation.mutate(file);
  };
  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log("Rejected files", files)}
      maxSize={10 * 1024 ** 2}
      accept={[MIME_TYPES.xlsx, MIME_TYPES.xls]}
      mt={30}
    >
      <Group
        position="center"
        spacing="xl"
        style={{
          minHeight: 150,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <IconUpload size={50} color="rgba(69, 70, 70, 1)" />
        <div>
          <Text size="md" color="dimmed" cursor="pointer">
            Drag Excel file here or click to select
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default ExcelDropzone;

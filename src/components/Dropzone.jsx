import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Text, Group } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

function ExcelDropzone({ onFileUpload }) {
  return (
    <Dropzone
      onDrop={(files) => onFileUpload(files)}
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

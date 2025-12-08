import { Box, Rating, Stack, Text } from "@mantine/core";

const CommentsCard = (comment) => {
  return (
    <>
      <Box
        w={280}
        style={{
          border: "1px solid rgba(163, 163, 163, 0.45)",

          outline: "none",
          padding: "10px 20px 15px",
          borderRadius: "8px",
        }}
      >
        <Stack gap={0}>
          <Text fw={700}>{comment.user.fullName}</Text>
          <Text fz={13} mb={15}>
            {comment.user.username}
          </Text>

          <Text c="rgba(51, 52, 51, 1)" h={58}>
            {comment.body}
          </Text>
          <Rating value={3} readOnly />
        </Stack>
      </Box>
    </>
  );
};

export default CommentsCard;

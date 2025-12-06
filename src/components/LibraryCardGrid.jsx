import { Card, Image, Text, Rating, Stack } from "@mantine/core";
import { librariesImages } from "../constants/libs";
import { Link } from "react-router-dom";

const LibraryCardGrid = ({ name, rating, id }) => {
  return (
    <Card
      shadow="md"
      radius="md"
      component={Link}
      to={`/library/${id}`}
      p="0"
      mx="sm"
      style={{
        position: "relative",
        overflow: "hidden",
        minWidth: 350,
        height: 280,
      }}
    >
      <Image
        src={librariesImages[Math.floor(id % 4)]}
        alt={name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          color: "white",
          padding: "10px",
        }}
      >
        <Stack spacing={4} p="10px">
          <Text weight={700} lineClamp={1}>
            {name}
          </Text>
          <Rating value={rating} readOnly size="sm" fractions={2} />
        </Stack>
      </div>
    </Card>
  );
};

export default LibraryCardGrid;

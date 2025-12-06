import { Card, Group, Image, Rating, Stack, Text } from "@mantine/core";
import { bookImages } from "../constants/books";
import { Link } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";

const BooksCardGrid = ({ author, name, publisher, id }) => {
  return (
    <Card
      p="md"
      radius="md"
      miw="235"
      bg="transparent"
      mx="sm"
      component={Link}
      to={`/books/${id}`}
      sx={{
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <Card.Section>
        <div style={{ position: "absolute", top: "10px", right: "20px" }}>
          <IconHeart size={24} stroke={1.5} />
        </div>
        <Image src={bookImages[Math.floor(id % 7)]} height={300} alt={name} />
      </Card.Section>

      <Group direction="column" spacing="xs" mt="sm" gap="0">
        <Stack gap="5px">
          <Text fw={700} fz="lg" lineClamp={2}>
            {name}
          </Text>
          <Text fz="sm" my="5px 0" td="italic">
            {author}
          </Text>
          <Text fz="sm" my="0">
            Nashriyot: {publisher}
          </Text>
          <Rating value={3.5} fractions={2} readOnly />
        </Stack>
      </Group>
    </Card>
  );
};

export default BooksCardGrid;

import { Box, Flex, Image, Rating, Stack, Text } from "@mantine/core";
import { librariesImages } from "../constants/libs";
import { IconMapDiscount } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const LibraryCardList = ({ library, name }) => {
  return (
    <Box
      component={Link}
      to={`/library/${library.id}/${name}`}
      style={{
        boxShadow: "0px 0px 10px rgba(162, 164, 164, 0.37)",
        borderRadius: "8px",
        padding: "10px",
        color: "rgba(63, 62, 63, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.63)",
      }}
    >
      <Flex align={"center"} gap={20}>
        <Image
          src={librariesImages[Math.floor(library.id % 4)]}
          w={150}
          h={150}
          fit="cover"
          radius={8}
        />
        <Stack>
          <Text>{name}</Text>
          <Flex gap={10}>
            <IconMapDiscount />
            <Text>{library.address}</Text>
          </Flex>
          <Rating value={Math.floor(library.id % 5) + 1} />
        </Stack>
      </Flex>
    </Box>
  );
};

export default LibraryCardList;

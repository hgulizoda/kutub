import { Card, Text, Button, Group, Stack, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

const SearchCard = ({ name, author }) => {
  return (
    <Card
      shadow="sm"
      padding="sm"
      component={Link}
      style={{
        width: "90%",
        height: "80px",
        margin: "10px auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Flex gap="0" justify="space-between" w="100%">
        <Stack gap="0">
          <Text weight={500} ta="left">
            {name}
          </Text>
          <Text size="sm" color="dimmed">
            Author: {author}
          </Text>
        </Stack>

        <Button size="sm">More</Button>
      </Flex>
    </Card>
  );
};

export default SearchCard;

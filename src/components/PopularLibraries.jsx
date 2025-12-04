import { Carousel } from "@mantine/carousel";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Autoplay from "embla-carousel-autoplay";
import BooksCardGrid from "./BooksCardGrid";
import { Stack, Text, Container, Flex, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LibraryCardGrid from "./LibraryCardGrid";

function PopularLibraries() {
  const { data: libraries, isPending } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries");
      return res.data;
    },
  });

  console.log(libraries);

  const navigate = useNavigate();

  return (
    <Stack>
      <Container size="xl">
        <Flex justify="space-between" mb="lg">
          <Text fz="h2" fw="500">
            Popular Libraries
          </Text>
          <Button variant="transparent" onClick={() => navigate("/libraries")}>
            See All <IconArrowRight />
          </Button>
        </Flex>
        <Carousel
          withIndicators
          pb="50px"
          slideSize="20%"
          slideGap="md"
          emblaOptions={{ loop: true, align: "start", slidesToScroll: 4 }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          {libraries?.map((library) => (
            <LibraryCardGrid key={library.id} {...library} />
          ))}
        </Carousel>
      </Container>
    </Stack>
  );
}

export default PopularLibraries;

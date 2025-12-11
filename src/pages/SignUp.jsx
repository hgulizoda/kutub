import {
  TextInput,
  PasswordInput,
  Switch,
  Button,
  Grid,
  Card,
  Stack,
  Title,
  Text,
  Group,
  Flex,
  Container,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeolocationControl,
  ZoomControl,
  Placemark,
} from "@pbe/react-yandex-maps";

export default function LibraryRegistrationForm() {
  const [address, setAddress] = useState("");
  const [placemark, setPlacemark] = useState(null);
  const getCoordinates = async (e) => {
    const coords = e.get("coords");
    setPlacemark(coords);
    const longitude = coords[0];
    const latitude = coords[1];
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=ddbe65d0-524a-48a4-ab34-0f3193d11450&geocode=${longitude},${latitude}&format=json&results=1&kind=house&lang=en_US`
    );
    const data = await response.json();

    if (
      data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        ?.metaDataProperty?.GeocoderMetaData?.text
    ) {
      setAddress(
        data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.text
      );
      return;
    }
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  };
  const form = useForm({
    initialValues: {
      user: {
        phone: "",
        password: "",
        name: "",
      },
      library: {
        address: "",
        social_media: "",
        can_rent_books: false,
        latitude: "",
        longitude: "",
      },
    },
  });

  return (
    <Container size="xl">
      <Flex>
        <Card
          withBorder
          shadow="md"
          radius="lg"
          p="xl"
          maw={700}
          mx="auto"
          mt="xl"
        >
          <Stack>
            <Title order={2} ta="center">
              Library Registration
            </Title>
            <Text ta="center" c="dimmed" mb="md">
              Create a library and user account
            </Text>

            <Card withBorder radius="md" p="lg">
              <Title order={4} mb="sm">
                User information
              </Title>

              <Stack>
                <TextInput
                  required
                  label="Phone"
                  placeholder="+998901234567"
                  {...form.getInputProps("user.phone")}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Enter your password"
                  {...form.getInputProps("user.password")}
                />
              </Stack>
            </Card>

            <Card withBorder radius="md" p="lg" mt="lg">
              <Title order={4} mb="sm">
                Library information
              </Title>

              <Stack>
                <TextInput
                  label="Name"
                  placeholder="Optional"
                  {...form.getInputProps("user.name")}
                />
                <TextInput
                  required
                  label="Address"
                  placeholder="Library address"
                  {...form.getInputProps("library.address")}
                  value={address}
                />

                <TextInput
                  label="Social Media"
                  placeholder="Instagram / Telegram link"
                  {...form.getInputProps("library.social_media")}
                />

                <Switch
                  label="Can rent books"
                  {...form.getInputProps("library.can_rent_books", {
                    type: "checkbox",
                  })}
                />
                <Box w={700} h={500} my="auto">
                  <Text>{address}</Text>
                  <YMaps width="100%">
                    <Map
                      width="100%"
                      height="100%"
                      state={{
                        center: placemark?.length
                          ? placemark
                          : [41.2995, 69.2401],
                        zoom: "12",
                        controls: [],
                      }}
                      onClick={getCoordinates}
                    >
                      <GeolocationControl options={{ float: "left" }} />
                      <ZoomControl />

                      {placemark ? (
                        <Placemark
                          geometry={placemark}
                          options={{
                            geodesic: true,
                            strokeWidth: 5,
                            strokeColor: "#F008",
                          }}
                        />
                      ) : null}
                    </Map>
                  </YMaps>
                </Box>

                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Latitude"
                      placeholder="e.g. 41.3111"
                      {...form.getInputProps("library.latitude")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Longitude"
                      placeholder="e.g. 69.2797"
                      {...form.getInputProps("library.longitude")}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>

            <Group justify="center" mt="xl">
              <Button size="md" radius="md" w={200}>
                Register
              </Button>
            </Group>
          </Stack>
        </Card>
      </Flex>
    </Container>
  );
}

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
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LibraryRegistrationForm() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { logIn } = useAuthStore();

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
      },
    });

    return null;
  }

  const form = useForm({
    initialValues: {
      user: {
        phone: "",
        password: "",
        name: "",
      },
      library: {
        address: "",
        social_media: {
          instagram: "",
          telegram: "",
          website: "",
        },
        can_rent_books: false,
        latitude: "",
        longitude: "",
      },
    },
  });

  useEffect(() => {
    if (!position) return;

    form.setFieldValue("library.latitude", String(position.lat));
    form.setFieldValue("library.longitude", String(position.lng));

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAddress(data?.display_name);
        form.setFieldValue("library.address", data?.display_name);
      });
  }, [position]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      return API.post("/auth/register-library/", data);
    },
    onSuccess: (res) => {
      console.log("SUCCESS:", res.data);
      navigate("/login");
    },
    onError: (err) => {
      setError(err);
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const sm = values.library.social_media;

    const payload = {
      ...values,
      library: {
        ...values.library,
        social_media: Object.values(sm).some((v) => v?.trim()) ? sm : null,
      },
    };

    mutation.mutate(payload);
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
          <Stack component="form" onSubmit={handleSubmit}>
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
                  required
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

                <Flex justify={"space-between"}>
                  <TextInput
                    label="Instagram"
                    placeholder="https://instagram.com/yourlibrary"
                    {...form.getInputProps("library.social_media.instagram")}
                  />

                  <TextInput
                    label="Telegram"
                    placeholder="https://t.me/yourlibrary"
                    {...form.getInputProps("library.social_media.telegram")}
                  />

                  <TextInput
                    label="Website"
                    placeholder="https://yourlibrary.com"
                    {...form.getInputProps("library.social_media.website")}
                  />
                </Flex>

                <Switch
                  label="Can rent books"
                  {...form.getInputProps("library.can_rent_books", {
                    type: "checkbox",
                  })}
                />
                <Box w="600px" h={500} my="auto">
                  <MapContainer
                    center={[41.2995, 69.2401]}
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "600px",
                    }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker setPosition={setPosition} />

                    {position && (
                      <Marker position={position}>
                        <Popup>
                          <div>
                            <b>Address:</b> {address}
                          </div>
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
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
                <Group justify="center" mt="xl">
                  <Button size="md" radius="md" w={200} type="submit">
                    Register
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Card>
      </Flex>
    </Container>
  );
}

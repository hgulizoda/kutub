import { Container, Group, Text, Anchor, Stack, Divider } from "@mantine/core";
import { IconBooks, IconMapPin, IconBrandGithub } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#f1f3f5", padding: "40px 0" }}>
      <Container size="xl">
        <Group justify="space-between" wrap="wrap">
          <Stack gap={4}>
            <Group>
              <IconBooks size={28} color="teal" />
              <Text size="xl" fw={700} c="teal">
                Kutub
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Find nearby libraries. Discover books instantly.
            </Text>
          </Stack>

          <Group gap="50px">
            <Stack gap={6}>
              <Text fw={600} size="sm" c="teal">
                Explore
              </Text>
              <Anchor href="#" size="sm">
                Find Libraries
              </Anchor>
              <Anchor href="#" size="sm">
                Find Books
              </Anchor>
              <Anchor href="#" size="sm">
                Categories
              </Anchor>
            </Stack>

            <Stack gap={6}>
              <Text fw={600} size="sm" c="teal">
                About
              </Text>
              <Anchor href="#" size="sm">
                About Us
              </Anchor>
              <Anchor href="#" size="sm">
                Contact
              </Anchor>
              <Anchor href="#" size="sm">
                FAQ
              </Anchor>
            </Stack>
          </Group>
        </Group>

        <Divider my="lg" />

        <Group justify="space-between" wrap="wrap">
          <Text size="sm" c="dimmed">
            © 2025 BookScout — All rights reserved
          </Text>

          <Group>
            <Anchor href="#" target="_blank">
              <IconBrandGithub size={20} />
            </Anchor>

            <Anchor href="#">
              <IconMapPin size={20} />
            </Anchor>
          </Group>
        </Group>
      </Container>
    </div>
  );
}

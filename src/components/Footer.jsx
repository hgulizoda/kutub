import { Container, Group, Text, Anchor, Stack, Divider } from "@mantine/core";
import { IconBooks, IconMapPin, IconBrandGithub } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div style={{ backgroundColor: "#f1f3f5", padding: "40px 0" }}>
      <Container size="xl">
        <Group justify="space-between" wrap="wrap">
          <Stack gap={4}>
            <Group>
              <IconBooks size={28} color="teal" />
              <Text size="xl" fw={700} c="teal"></Text>
            </Group>
            <Text size="sm" c="dimmed">
              {t("footer.motto")}
            </Text>
          </Stack>

          <Group gap="50px">
            <Stack gap={6}>
              <Text fw={600} size="sm" c="teal">
                {t("footer.explore")}
              </Text>
              <Anchor href="#" size="sm">
                {t("footer.findBooks")}
              </Anchor>
              <Anchor href="#" size="sm">
                {t("header.libraries")}
              </Anchor>
              <Anchor href="#" size="sm">
                {t("footer.categories")}
              </Anchor>
            </Stack>

            <Stack gap={6}>
              <Text fw={600} size="sm" c="teal">
                {t("footer.about")}
              </Text>
              <Anchor href="#" size="sm">
                {t("footer.aboutUs")}
              </Anchor>
              <Anchor href="#" size="sm">
                {t("footer.contact")}
              </Anchor>
              <Anchor href="#" size="sm">
                {t("footer.faq")}
              </Anchor>
            </Stack>
          </Group>
        </Group>

        <Divider my="lg" />

        <Group justify="space-between" wrap="wrap">
          <Text size="sm" c="dimmed">
            {t("footer.copyright")}
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

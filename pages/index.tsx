import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../hooks";

export default function Home() {
  const t = useTranslations();

  return (
    <Container centerContent>
      <Center minH="100vh" maxW="sm">
        <Stack>
          <Heading>{t.appTitle}</Heading>
          <Input placeholder={t.form.name.title} required />
          <Input placeholder={t.form.email.title} required />
          <Button colorScheme="brand">{t.form.enter}</Button>
        </Stack>
      </Center>
    </Container>
  );
}

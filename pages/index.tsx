import { Center, Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/pages/home/LoginForm";
import { useTranslations } from "../hooks";
import { ILogin } from "../interfaces";
import { setCookie } from "cookies-next";
import { trimObjStrings } from "../utils/trimObjStrings";

export default function Home() {
  const t = useTranslations();

  const onSubmit = (values: ILogin) => {
    const trimmedValues = trimObjStrings(values);
    setCookie("login", trimmedValues);
  };

  return (
    <Container centerContent>
      <Center minH="100vh" maxW="sm">
        <Stack>
          <Heading>{t.appTitle}</Heading>
          <LoginForm onSubmit={onSubmit} />
        </Stack>
      </Center>
    </Container>
  );
}

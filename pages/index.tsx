import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import UserForm from "../components/pages/home/UserForm";
import { useTranslations } from "../hooks";
import { IUser } from "../interfaces";
import { setCookie } from "cookies-next";
import { trimObjStrings } from "../utils";
import { COOKIE_KEY } from "../constants";

export default function Home() {
  const t = useTranslations();

  const onSubmit = (values: IUser) => {
    const trimmedValues = trimObjStrings(values);
    setCookie(COOKIE_KEY.USER, trimmedValues);
  };

  return (
    <Container centerContent>
      <Center minH="100vh" maxW="sm">
        <Stack spacing="8">
          <Heading textAlign="center">{t.appTitle}</Heading>
          <UserForm onSubmit={onSubmit} />
          <Text fontSize="xs">{t.form.cookieText}</Text>
        </Stack>
      </Center>
    </Container>
  );
}

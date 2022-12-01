import { Center, Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import UserForm from "../components/pages/home/UserForm";
import { useTranslations } from "../hooks";
import { IUser } from "../interfaces";
import { setCookie } from "cookies-next";
import { trimObjStrings } from "../utils/trimObjStrings";

export default function Home() {
  const t = useTranslations();

  const onSubmit = (values: IUser) => {
    const trimmedValues = trimObjStrings(values);
    setCookie("user", trimmedValues);
  };

  return (
    <Container centerContent>
      <Center minH="100vh" maxW="sm">
        <Stack>
          <Heading>{t.appTitle}</Heading>
          <UserForm onSubmit={onSubmit} />
        </Stack>
      </Center>
    </Container>
  );
}

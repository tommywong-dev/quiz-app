import { Center, Container, Stack } from "@chakra-ui/react";
import React from "react";
import UserForm from "../components/pages/home/UserForm";
import { useTranslations } from "../hooks";
import { IUser } from "../interfaces";
import { setCookie } from "cookies-next";
import { trimObjStrings } from "../utils";
import { COOKIE_KEY } from "../constants";
import AppTitle from "../components/common/AppTitle";
import AppText from "../components/common/AppText";
import { useRouter } from "next/router";
import AppContainer from "../components/common/AppContainer";

export default function Home() {
  const t = useTranslations();
  const router = useRouter();

  const onSubmit = (values: IUser) => {
    const trimmedValues = trimObjStrings(values);
    setCookie(COOKIE_KEY.USER, trimmedValues);
    router.push("/quiz");
  };

  return (
    <AppContainer>
      <Stack spacing="8">
        <AppTitle />
        <UserForm onSubmit={onSubmit} />
        <AppText fontSize="xs">{t.form.cookieText}</AppText>
      </Stack>
    </AppContainer>
  );
}

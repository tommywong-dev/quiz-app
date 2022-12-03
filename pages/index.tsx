import { Stack } from "@chakra-ui/react";
import React from "react";
import UserForm from "../components/pages/home/UserForm";
import { IUser } from "../interfaces";
import { deleteCookie, setCookie } from "cookies-next";
import { trimObjStrings } from "../utils";
import { COOKIE_KEY } from "../constants";
import AppTitle from "../components/common/AppTitle";
import { useRouter } from "next/router";
import AppContainer from "../components/common/AppContainer";
import CookieText from "../components/pages/home/CookieText";

export default function Home() {
  const router = useRouter();

  const onSubmit = (values: IUser) => {
    const trimmedValues = trimObjStrings(values);
    setCookie(COOKIE_KEY.USER, trimmedValues);
    deleteCookie(COOKIE_KEY.ANSWERS);
    router.push("/quiz");
  };

  return (
    <AppContainer>
      <Stack spacing="8">
        <AppTitle />
        <UserForm onSubmit={onSubmit} />
        <CookieText />
      </Stack>
    </AppContainer>
  );
}

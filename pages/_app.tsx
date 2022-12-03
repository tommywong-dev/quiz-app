import "../public/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { theme } from "../theme";
import { AlertProvider } from "../providers";
import Head from "next/head";
import { useTranslations } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  const t = useTranslations();

  return (
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <Head>
          <title>{t.appTitle}</title>
        </Head>
        <Component {...pageProps} />
      </AlertProvider>
    </ChakraProvider>
  );
}

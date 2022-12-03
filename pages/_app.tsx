import "../public/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { theme } from "../theme";
import { AlertProvider } from "../providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </ChakraProvider>
  );
}

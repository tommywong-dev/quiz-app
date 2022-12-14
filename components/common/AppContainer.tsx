import { Center, Container } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface Props {
  children: ReactNode;
  isQuizPage?: boolean;
}

const AppContainer = (props: Props) => {
  const { children, isQuizPage = false } = props;

  return (
    <Container centerContent>
      <AppHeader isQuizPage={isQuizPage} />
      <Center minH="100vh" maxW="md" minW="xs" p="4">
        {children}
      </Center>
    </Container>
  );
};

export default AppContainer;

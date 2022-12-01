import { Center, Container } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppContainer = (props: Props) => {
  return (
    <Container centerContent>
      <Center minH="100vh" maxW="md">
        {props.children}
      </Center>
    </Container>
  );
};

export default AppContainer;

import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

interface Props {
  isQuizPage: boolean;
}
const AppHeader = (props: Props) => {
  const { isQuizPage } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      sx={{
        justifyContent: "space-between",
        padding: "2rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <IconButton
        aria-label="exit"
        variant="ghost"
        visibility={isQuizPage ? "visible" : "hidden"}
        icon={<CloseIcon />}
      />
      <IconButton
        aria-label="exit"
        variant="ghost"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </HStack>
  );
};

export default AppHeader;

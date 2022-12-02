import { CloseIcon, MoonIcon, SmallCloseIcon, SunIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import React, { useRef, useState } from "react";
import { COOKIE_KEY } from "../../constants";
import { useAlertExit, useTranslations } from "../../hooks";

interface Props {
  isQuizPage: boolean;
}
const AppHeader = (props: Props) => {
  const { isQuizPage } = props;
  const t = useTranslations();
  const { colorMode, toggleColorMode } = useColorMode();

  const { cancelRef, alertExit, handleAlert, handleClose, handleExit } =
    useAlertExit();

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
      <Tooltip label={t.header.exit.label}>
        <IconButton
          aria-label="exit"
          variant="ghost"
          visibility={isQuizPage ? "visible" : "hidden"}
          icon={<SmallCloseIcon />}
          onClick={handleAlert}
        />
      </Tooltip>
      <AlertDialog
        isOpen={alertExit}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t.header.exit.label}
            </AlertDialogHeader>
            <AlertDialogBody>{t.header.exit.message}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                {t.header.exit.no}
              </Button>
              <Button colorScheme="red" onClick={handleExit} ml={3}>
                {t.header.exit.yes}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Tooltip
        label={colorMode === "light" ? t.header.mode.dark : t.header.mode.light}
      >
        <IconButton
          aria-label="exit"
          variant="ghost"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Tooltip>
    </HStack>
  );
};

export default AppHeader;

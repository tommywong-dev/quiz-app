import { MoonIcon, SmallCloseIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { COOKIE_KEY } from "../../constants";
import { useTranslations } from "../../hooks";
import { useAlert } from "../../providers";

interface Props {
  isQuizPage: boolean;
}
const AppHeader = (props: Props) => {
  const { isQuizPage } = props;
  const t = useTranslations();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { alert } = useAlert();

  const handleAlertExit = () => {
    alert({
      header: t.header.exit.label,
      body: t.header.exit.message,
      onConfirm: () => {
        deleteCookie(COOKIE_KEY.ANSWERS);
        deleteCookie(COOKIE_KEY.USER);
        router.push("/");
      },
    });
  };

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
          onClick={handleAlertExit}
        />
      </Tooltip>

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

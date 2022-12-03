import { useToast } from "@chakra-ui/react";
import { deleteCookie, getCookie } from "cookies-next";
import { COOKIE_KEY } from "../constants";
import { useTranslations } from "./useTranslations";

export const useError = () => {
  const toast = useToast();
  const error = getCookie(COOKIE_KEY.ERROR)?.toString();
  const t = useTranslations();

  const checkErrorAndToast = () => {
    if (error) {
      toast({
        title: t.common.error,
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          deleteCookie(COOKIE_KEY.ERROR);
        },
      });
    }
  };

  return checkErrorAndToast;
};

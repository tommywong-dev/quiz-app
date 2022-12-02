import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { COOKIE_KEY } from "../constants";

export const useAlertExit = () => {
  const router = useRouter();

  const cancelRef = useRef(null);
  const [alertExit, setAlertExit] = useState(false);

  const handleAlert = () => setAlertExit(true);
  const handleClose = () => setAlertExit(false);
  const handleExit = () => {
    setAlertExit(false);
    deleteCookie(COOKIE_KEY.ANSWERS);
    deleteCookie(COOKIE_KEY.USER);
    router.push("/");
  };

  return { cancelRef, alertExit, handleAlert, handleClose, handleExit };
};

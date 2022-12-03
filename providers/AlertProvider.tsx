import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useTranslations } from "../hooks";

interface Props {
  children: ReactNode;
}

interface AlertData {
  header: string;
  body: ReactNode;
  onClose?: () => void;
  onCloseLabel?: string;
  onConfirm: () => void;
  onConfirmLabel?: string;
}

export const AlertContext = createContext({
  alert: (data: AlertData) => {},
});

export const AlertProvider = (props: Props) => {
  const t = useTranslations();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<AlertData>({
    header: "",
    body: "",
    onClose: () => {},
    onCloseLabel: "",
    onConfirm: () => {},
    onConfirmLabel: "",
  });

  const handleClose = () => {
    data.onClose && data.onClose();
    setOpen(false);
  };

  const handleConfirm = () => {
    data.onConfirm();
    setOpen(false);
  };

  const alert = (data: AlertData) => {
    setData(data);
    setOpen(true);
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="8">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {data.header}
            </AlertDialogHeader>
            <AlertDialogBody>{data.body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                id="alert-cancel-btn"
                ref={cancelRef}
                onClick={handleClose}
              >
                {data.onCloseLabel || t.common.no}
              </Button>
              <Button
                id="alert-confirm-btn"
                colorScheme="red"
                onClick={handleConfirm}
                ml={3}
              >
                {data.onConfirmLabel || t.common.yes}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {props.children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertProvider;

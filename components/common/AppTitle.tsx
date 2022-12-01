import { Heading } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../hooks";

const AppTitle = () => {
  const t = useTranslations();

  return (
    <Heading
      textAlign="center"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="widest"
    >
      {t.appTitle}
    </Heading>
  );
};

export default AppTitle;

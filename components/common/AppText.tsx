import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

const AppText = (props: TextProps) => {
  return <Text letterSpacing="wide" {...props} />;
};

export default AppText;

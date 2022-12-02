import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const QuizButton = (props: ButtonProps) => {
  return (
    <Button
      colorScheme="blackAlpha"
      sx={{
        color: props.variant === "outline" ? "blackAlpha.900" : "white",
        backgroundColor:
          props.variant === "outline" ? "white" : "blackAlpha.900",
      }}
      {...props}
    />
  );
};

export default QuizButton;

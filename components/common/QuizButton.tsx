import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const QuizButton = (props: ButtonProps) => {
  const isOutline = props.variant === "outline";
  return (
    <Button
      colorScheme="blackAlpha"
      sx={{
        borderWidth: "1.5px",
        px: "2rem",
        color: isOutline ? "blackAlpha.900" : "white",
        backgroundColor: isOutline ? "white" : "blackAlpha.900",
        _hover: {
          backgroundColor: isOutline ? "blackAlpha.50" : "blackAlpha.800",
        },
      }}
      {...props}
    />
  );
};

export default QuizButton;

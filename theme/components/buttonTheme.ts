import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: 0,
  textTransform: "uppercase",
  letterSpacing: "widest",
  fontSize: "xs",
  fontWeight: 900,
});

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});

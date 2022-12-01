import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: 0,
  textTransform: "uppercase",
  letterSpacing: 3,
  fontSize: "xs",
  fontWeight: 900,
});

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});

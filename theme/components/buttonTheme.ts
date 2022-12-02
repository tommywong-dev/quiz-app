import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: 0,
  textTransform: "uppercase",
  letterSpacing: "widest",
  fontFamily: "Gotham-Bold",
});

const outline = defineStyle({
  fontSize: "xs",
});

const solid = defineStyle({
  fontSize: "xs",
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { outline, solid },
});

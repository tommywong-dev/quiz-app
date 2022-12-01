import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { letterSpacings } from "./letterSpacings";
import { components } from "./components";

export const theme = extendTheme({
  colors,
  fonts,
  letterSpacings,
  components,
});

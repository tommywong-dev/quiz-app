import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const outline = definePartsStyle({
  field: {
    letterSpacing: "wide",
    borderRadius: 0,
    _focusVisible: {
      borderColor: "brand.300",
      boxShadow: "0 0 0 1px brand.300",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { outline },
});

import { heroui } from "@heroui/react";

export default heroui({
  prefix: "pgs",
  addCommonColors: false,
  layout: {
    borderWidth: {
      small: "1px",
      medium: "1px",
      large: "2px",
    },
    radius: {
      small: "8px", // rounded-small
      medium: "12px", // rounded-medium
      large: "16px", // rounded-large
    },
  },
  themes: {
    light: {
      colors: {
        default: "#6B46C1",
        foreground: "#404544",
        danger: "#ff515a",
      },
    },
    dark: {
      colors: {
        default: "#3b3b3b",
        foreground: "#e1e1e1",
        danger: "#ff515a",
      },
    },
  },
});

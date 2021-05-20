import { black, white } from "./colors";

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 576,
    tablet: 768,
    desktop: 992,
    ultra: 1200,
  },
  color: {
    white,
    black,

    system: {
      1: "#d94351",
      2: "#E63946",
      3: "#F1FAEE",
      4: "#A8DADC",
      5: "#207CF4",
      6: "#1D3557",
    },
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
};

export default theme;

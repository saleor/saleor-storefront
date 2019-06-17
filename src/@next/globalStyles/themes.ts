import baseStyled, { ThemedStyledInterface } from "styled-components";

import * as C from "./constants";

export const defaultTheme = {
  // Theme name for storybook addon
  name: "default",
  // tslint:disable-next-line:object-literal-sort-keys
  button: {
    animation: {
      transition: "0.3s",
    },
    colors: {
      primary: {
        activeBackground: C.turquoiseDark,
        background: C.turquoise,
        color: C.white,
        hoverBackground: C.turquoiseDark,
        hoverColor: C.white,
      },
      secondary: {
        activeBackground: C.blueDark,
        background: C.white,
        color: C.blue,
        hoverBackground: C.blue,
        hoverColor: C.white,
      },
    },
    padding: {
      main: "0.9rem 3.7rem",
      small: "0.9rem 1rem",
    },
    typography: {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.25rem",
      textTransform: "uppercase",
    },
  },
  carousel: {
    carouselControlPadding: "0.2rem 0.5rem",
    carouselControlShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
  },
  colors: {
    autofillColor: C.autofillColor,
    autofillColorSelected: C.autofillColorSelected,
    baseFontColor: C.baseFontColor,
    primaryColor: C.turquoise,
    secondaryColor: C.blue,
  },
  container: {
    width: 1140,
  },
  grid: {
    containerWidth: 1140,
  },
  input: {
    labelColor: C.grayDark,
    labelFontSize: "0.75rem", // 12px
    selectMenuShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  imageButton: {
    hoverBackgroundColor: C.blue,
    hoverForegroundColor: C.white,
  },
  message: {
    backgroundColor: C.white,
    borderLeft: `0.3rem solid ${C.turquoiseDark}`,
    contentMargin: `${C.spacer}rem 0 0`,
    errorColor: C.rose,
    neutralColor: C.turquoiseDark,
    padding: "1.5rem",
    successColor: C.green,
    titleMargin: `0 ${C.spacer * 1.5}rem 0 0`,
    titleTransform: "uppercase",
    titleWeight: C.boldFontWeight,
    width: "25rem",
  },
  modal: {
    modalMinHeight: 455,
    modalWidth: 555,
  },
  productItem: {
    productItemCategoryColor: C.gray,
    productItemPriceFontWeight: C.boldFontWeight,
    productItemPriceMargin: `${C.spacer}rem 0 0`,
    productItemTitleFontWeight: C.boldFontWeight,
    productItemTitleHeight: "2.5rem",
    productItemTitleMargin: `${C.spacer / 2}rem 0 0`,
    productItemTitleTextTransform: "uppercase",
  },
  spacing: {
    spacer: `${C.spacer}rem`, // 16px
  },
  tile: {
    backgroundColor: C.turquoiseLight,
    divisionLine: C.gray,
    hoverBorder: C.blueDark,
  },
  typography: {
    baseFontFamily: C.baseFontFamily,
    baseFontSize: C.baseFontSize, // 16px
    baseLineHeight: C.baseLineHeight, // 20px
    boldFontWeight: C.boldFontWeight,
    extraBoldFontWeight: C.extraBoldFontWeight,
    h1FontSize: C.h1FontSize, // 64px
    h1LineHeight: C.h1LineHeight,
    h3FontSize: C.h3FontSize, // 24px
    h4FontSize: C.h4FontSize, // 18px
    smallFontSize: C.smallFontSize, // 14px
  },
};

export type DefaultTheme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;

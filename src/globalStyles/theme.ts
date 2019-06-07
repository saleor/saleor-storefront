import baseStyled, { ThemedStyledInterface } from 'styled-components';

const blue = '#21125e';

export const defaultTheme = {
  breakpoints: {
    mediumScreen: 992,
    smallScreen: 540,
  },
  colors: {
    autofillColor: 'rgb(250, 255, 189)',
    autofillColorSelected: 'rgb(232, 240, 254)',
    baseFontColor: '#323232',
    black: '#000',
    blue,
    blueDark: '#190c4e',
    blueOverlay: `rgba(${blue}, 0.15)`,
    gray: '#c4c4c4',
    grayDark: '#7d7d7d',
    grayLight: '#f6f6f6',
    green: '#3ed256',
    rose: '#c22d74',
    turquoise: '#51e9d2',
    turquoiseDark: '#55c4b3',
    turquoiseLight: '#f1f5f5',
    white: '#fff',
  },
  container: {
    width: 1140,
  },
  grid: {
    containerWidth: 1140,
  },
  spacing: {
    spacer: '1rem', // 16px
  },
  typography: {
    baseFontFamily: 'montserrat',
    baseFontSize: '1rem', // 16px
    baseLineHeight: '1.25rem', // 20px
    boldFontWeight: 600,
    extraBoldFontWeight: 800,
    h1FontSize: '4rem', // 64px
    h1LineHeight: 1,
    h3FontSize: '1.5rem', // 24px
    h4FontSize: '1.125rem', // 18px
    smallFontSize: '0.875rem', // 14px
  },
}

type DefaultTheme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;

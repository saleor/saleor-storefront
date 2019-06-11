import { css } from "styled-components";

import { mediumScreen, smallScreen } from "./constants";

const breakpoints = {
  mediumScreen,
  smallScreen,
};

type Media = Record<
  keyof typeof breakpoints,
  (l: TemplateStringsArray, ...p: any[]) => string
>;

export const media = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label] = (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) => css`
      @media (max-width: ${breakpoints[label]}px) {
        ${css(literals, ...placeholders)}
      }
    `;
    return acc;
  },
  // tslint:disable-next-line:no-object-literal-type-assertion
  {} as Media
);

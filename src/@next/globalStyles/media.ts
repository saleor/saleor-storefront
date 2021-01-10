import { css, SimpleInterpolation } from "styled-components";

import {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xxLargeScreen,
  xxxLargeScreen,
} from "./constants";

const breakpoints = {
  largeScreen,
  mediumScreen,
  smallScreen,
  xLargeScreen,
  xxLargeScreen,
  xxxLargeScreen,
};

type Breakpoints = keyof typeof breakpoints;
type Media = Record<
  Breakpoints,
  (l: TemplateStringsArray, ...p: any[]) => string
>;

export const media = Object.keys(breakpoints).reduce(
  (acc, label) => {
    acc[label as Breakpoints] = (
      literals: TemplateStringsArray,
      ...placeholders: SimpleInterpolation[]
    ) =>
      css`
        @media (max-width: ${breakpoints[label as Breakpoints]}px) {
          ${css(literals, ...placeholders)}
        }
      ` as any;
    return acc;
  },
  // tslint:disable-next-line:no-object-literal-type-assertion
  {} as Media
);

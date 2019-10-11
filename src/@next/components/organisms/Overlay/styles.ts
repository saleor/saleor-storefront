import { styled } from "@styles";
import { css, keyframes } from "styled-components";
import { Position, TransitionState } from "./types";

interface IStyleProps {
  open: boolean;
  position: Position;
  state: TransitionState;
  transparent?: boolean;
}

const getTranslate = (side: "left" | "right") =>
  side === "left" ? "-100%" : "100%";

const slideAnimation = (open: boolean, side: "left" | "right") => {
  const initialValue = open ? getTranslate(side) : 0;
  const endValue = open ? 0 : getTranslate(side);
  return keyframes`
    from {
      transform: translateX(${initialValue});
    }
    to {
      transform: translateX(${endValue});
    }`;
};

const opacity = {
  entered: 1,
  entering: 0,
  exited: 0,
  exiting: 0,
  unmounted: 0,
};

const justify = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

const lightboxWidth = {
  center: "auto",
  left: "100%",
  right: "100%",
};

const lightboxHeight = (width: number) => ({
  center: `${width}px`,
  left: "auto",
  right: "auto",
});

export const Lightbox = styled.div<IStyleProps>`
  display: flex;
  position: relative;
  width: ${({ position, theme: { modal } }) =>
    lightboxHeight(modal.modalWidth)[position]};
  min-height: ${props => props.theme.modal.modalMinHeight}px;
  height: ${({ position }) => lightboxWidth[position]};
  background-color: ${props => props.theme.colors.white};
  ${({ open, position }) => {
    if (position === "left" || position === "right") {
      return css`
        ${position}: 0;
        transform: translateX(${getTranslate(position)});
        animation: ${slideAnimation(open, position)} 0.4s both;
        animation-delay: ${open ? ".1s" : 0};
      `;
    }
  }}
`;
Lightbox.displayName = "S.Lightbox";

export const Overlay = styled.div<IStyleProps>`
  display: flex;
  position: fixed;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  top: 0;
  z-index: 2;
  transition: opacity 0.2s ease;
  transition-delay: ${({ open }) => (open ? 0 : ".4s")};
  background-color: ${({ transparent, theme }) =>
    transparent ? "" : theme.colors.overlay};
  align-items: center;
  justify-content: ${({ position }) => justify[position]};
  opacity: ${({ state }) => opacity[state]};
`;
Overlay.displayName = "S.Overlay";

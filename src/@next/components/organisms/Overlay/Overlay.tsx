import React from "react";
import * as ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import { ssrMode } from "@temp/constants";
import * as S from "./styles";
import { IProps } from "./types";

const modalRoot = !ssrMode ? document.getElementById("modal-root") : null;

export const Overlay: React.FC<IProps> = ({
  children,
  duration = 600,
  hide,
  position = "center",
  show,
  transparent = false,
  target = modalRoot,
  testingContext,
  testingContextId,
}: IProps) => {
  const animationProps = {
    open: show,
    position,
  };
  return (
    target &&
    ReactDOM.createPortal(
      <Transition in={show} timeout={duration} unmountOnExit>
        {state => (
          <S.Overlay
            {...animationProps}
            state={state}
            onClick={hide}
            transparent={transparent}
            data-test={testingContext}
            data-test-id={testingContextId}
          >
            <S.Lightbox
              {...animationProps}
              state={state}
              onClick={e => e.stopPropagation()}
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      target
    )
  );
};

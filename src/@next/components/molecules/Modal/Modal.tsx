import React from "react";
import * as ReactDOM from "react-dom";

import { Button, Icon } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  submitBtnText,
  target = modalRoot,
  show,
  title,
}: IProps) => {
  return target && show
    ? ReactDOM.createPortal(
        <S.Overlay>
          <S.Lightbox>
            <S.Modal>
              <S.Header>
                <p>{title}</p>
                <S.CloseBtn onClick={hide}>
                  <Icon name="x" size={19} />
                </S.CloseBtn>
              </S.Header>
              <S.Content>{children}</S.Content>
              <S.Footer>
                {cancelBtnText && (
                  <button onClick={hide}>{cancelBtnText}</button>
                )}
                {submitBtnText && (
                  <Button
                    type="submit"
                    form={formId}
                    disabled={loading}
                    size="xs"
                  >
                    {loading ? "Loading" : submitBtnText}
                  </Button>
                )}
              </S.Footer>
            </S.Modal>
          </S.Lightbox>
        </S.Overlay>,
        target
      )
    : null;
};
// className="modal__cancelBtn"

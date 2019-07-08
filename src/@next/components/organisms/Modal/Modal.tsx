import React from "react";

import { Icon } from "@components/atoms";
import { FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  submitBtnText,
  show,
  title,
}: IProps) => {
  return (
    <Overlay position="center" show={show} hide={hide}>
      <S.Modal>
        <S.Header>
          <p>{title}</p>
          <S.CloseBtn onClick={hide}>
            <Icon name="x" size={19} />
          </S.CloseBtn>
        </S.Header>
        <S.Content>{children}</S.Content>
        <FormFooter
          divider
          submitBtn={{ text: loading ? "Loading" : submitBtnText }}
          cancelBtn={{ action: hide, text: cancelBtnText }}
          formId={formId}
        />
      </S.Modal>
    </Overlay>
  );
};

import React from "react";

import { CardHeader, FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (text: string, action: () => void) =>
  text && {
    cancelBtn: {
      action,
      text,
    },
  };

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
        <CardHeader closeIcon divider onHide={hide}>
          {title}
        </CardHeader>
        <S.Content>{children}</S.Content>
        <FormFooter
          divider
          submitBtn={{ text: loading ? "Loading" : submitBtnText }}
          {...getCancelBtnProps(cancelBtnText, hide)}
          formId={formId}
        />
      </S.Modal>
    </Overlay>
  );
};

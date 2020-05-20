import React from "react";

import { CardHeader, FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      dataCy: 'cancelButton',
      text,
    },
  };

const getSubmitBtnProps = (text: string, submitButtonDataCy: string, action?: () => void) => ({
  submitBtn: action
    ? {
        action,
        dataCy: submitButtonDataCy,
        text,
      }
    : { dataCy: submitButtonDataCy, text },
});

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  disabled,
  hide,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  submitButtonDataCy,
  show,
  target,
  title,
}: IProps) => {
  return (
    <Overlay position="center" show={show} hide={hide} target={target}>
      <S.Modal>
        <CardHeader divider onHide={hide}>
          {title}
        </CardHeader>
        <S.Content>{children}</S.Content>
        <FormFooter
          divider
          disabled={disabled}
          {...getSubmitBtnProps(submitBtnText, submitButtonDataCy, onSubmit)}
          {...getCancelBtnProps(hide, cancelBtnText)}
          formId={formId}
        />
      </S.Modal>
    </Overlay>
  );
};

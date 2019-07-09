import { Trans } from "@lingui/react";
import React from "react";

import { CardHeader, FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

const LoadingText = () => <Trans id="Loading" />;
const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      text,
    },
  };

const getSubmitBtnProps = (
  text: string | React.ReactElement,
  action?: () => void
) => ({
  submitBtn: action
    ? {
        action,
        text,
      }
    : { text },
});

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  show,
  target = null,
  title,
}: IProps) => {
  return (
    <Overlay position="center" show={show} hide={hide} target={target}>
      <S.Modal>
        <CardHeader closeIcon divider onHide={hide}>
          {title}
        </CardHeader>
        <S.Content>{children}</S.Content>
        <FormFooter
          divider
          {...getSubmitBtnProps(
            loading ? <LoadingText /> : submitBtnText,
            onSubmit
          )}
          {...getCancelBtnProps(hide, cancelBtnText)}
          formId={formId}
        />
      </S.Modal>
    </Overlay>
  );
};

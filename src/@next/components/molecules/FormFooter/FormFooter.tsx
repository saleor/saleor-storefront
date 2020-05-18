import React from "react";

import { Button, ButtonLink } from "@components/atoms";
import * as S from "./styles";
import { IButtonProps, IProps } from "./types";

const LoadingText = () => <>Loading</>;

const getBtnAction = (btn: IButtonProps) =>
  btn.action && { onClick: btn.action };

const renderCancelBtn = (cancelBtn?: IButtonProps) =>
  cancelBtn && (
    <ButtonLink {...getBtnAction(cancelBtn)} type="button" color="secondary">
      {cancelBtn.text}
    </ButtonLink>
  );

const renderSubmitBtn = (
  submitBtn: IButtonProps,
  disabled: boolean,
  formId?: string
) =>
  submitBtn && (
    <Button
      dataCy={submitBtn.dataCy}
      {...getBtnAction(submitBtn)}
      type={formId ? "submit" : "button"}
      form={formId}
      disabled={disabled}
      size="sm"
    >
      {disabled ? <LoadingText /> : submitBtn.text}
    </Button>
  );

export const FormFooter: React.FC<IProps> = ({
  cancelBtn,
  disabled = false,
  divider = false,
  formId,
  submitBtn,
}: IProps) => {
  return (
    <S.Footer divider={divider}>
      {renderCancelBtn(cancelBtn)}
      {renderSubmitBtn(submitBtn, disabled, formId)}
    </S.Footer>
  );
};

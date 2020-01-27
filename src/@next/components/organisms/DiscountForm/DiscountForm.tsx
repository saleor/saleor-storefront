import React from "react";

import { Button, Chip, ErrorMessage, Input } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

export const DiscountForm: React.FC<IProps> = ({
  handleApplyDiscount = () => null,
  handleRemovePromoCode = () => null,
  discount,
  errors,
}: IProps) => {
  const promoCode = discount && discount.promoCode;
  const hasErrors = !!(errors && errors.length);

  const [inputCode, setInputCode] = React.useState("");

  const handleApplyBtnClick = () => {
    handleApplyDiscount(inputCode);
    setInputCode("");
  };

  return (
    <S.Wrapper>
      <S.Input>
        <S.InputWithButton>
          <S.InputWrapper>
            <Input
              error={hasErrors}
              value={inputCode}
              label="Promo Code"
              onChange={evt => setInputCode(evt.target.value)}
            />
          </S.InputWrapper>
          <Button onClick={handleApplyBtnClick}>Apply</Button>
        </S.InputWithButton>
        <ErrorMessage errors={errors} />
      </S.Input>
      {promoCode && (
        <>
          <span>Promo code:</span>
          <S.ChipsWrapper>
            <Chip onClose={handleRemovePromoCode}>{promoCode}</Chip>
          </S.ChipsWrapper>
        </>
      )}
    </S.Wrapper>
  );
};

import React from "react";

import { Button, Chip, Input } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

export const DiscountForm: React.FC<IProps> = ({
  handleApplyDiscount = () => null,
  handleRemovePromoCode = () => null,
  discount,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState("");

  const handleApplyBtnClick = () => {
    handleApplyDiscount(inputCode);
    setInputCode("");
  };

  return (
    <S.Wrapper>
      <S.InputWithButton>
        <S.InputWrapper>
          <Input
            value={inputCode}
            label="Promo Code"
            onChange={evt => setInputCode(evt.target.value)}
          />
        </S.InputWrapper>
        <Button onClick={handleApplyBtnClick}>Apply</Button>
      </S.InputWithButton>
      {promoCode && (
        <>
          <span>Promo code:</span>
          <Chip onClose={handleRemovePromoCode}>{promoCode}</Chip>
        </>
      )}
    </S.Wrapper>
  );
};

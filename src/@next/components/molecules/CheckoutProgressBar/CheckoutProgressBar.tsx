import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const CheckoutProgressBar: React.FC<IProps> = ({}: // destructure props here if needed
IProps) => {
  return (
    <S.Wrapper>
      <S.Step>
        Billing
        <S.Dot done={true} />
        <S.ProgressBar done={true} />
      </S.Step>
      <S.Step>
        <S.LeftBar done={true} />
        Shipping
        <S.Dot done={true} />
        <S.RightBar done={true} />
      </S.Step>
      <S.Step>
        <S.LeftBar done={true} />
        Payment
        <S.ActiveDot />
        <S.RightBar />
      </S.Step>
      <S.Step>
        Review
        <S.Dot />
        <S.ProgressBar />
      </S.Step>
    </S.Wrapper>
  );
};

export { CheckoutProgressBar };

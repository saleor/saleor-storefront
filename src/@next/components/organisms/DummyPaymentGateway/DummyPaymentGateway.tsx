import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const DummyPaymentGateway: React.FC<IProps> = ({
  // destructure props here if needed
}: IProps) => {
  return (
    <S.Wrapper>
      {/* --- here --- */}
    </S.Wrapper>
  )
};

export { DummyPaymentGateway }
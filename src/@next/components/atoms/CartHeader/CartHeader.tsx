import React from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";

/**
 * Cart header to use with conjunction of cart rows.
 */
const CartHeader: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Column>
        <FormattedMessage {...commonMessages.products} />
      </S.Column>
      <S.Column>
        <FormattedMessage {...commonMessages.price} />
      </S.Column>
      <S.Column>
        <FormattedMessage {...commonMessages.quantity} />
      </S.Column>
      <S.Column>
        <FormattedMessage {...commonMessages.totalPrice} />
      </S.Column>
    </S.Wrapper>
  );
};

export { CartHeader };

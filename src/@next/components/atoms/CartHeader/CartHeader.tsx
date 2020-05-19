import React from "react";

import * as S from "./styles";

import { FormattedMessage } from "react-intl";

/**
 * Cart header to use with conjunction of cart rows.
 */
const CartHeader: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Column>
        <FormattedMessage
            defaultMessage="Products"
        />
      </S.Column>
      <S.Column>
        <FormattedMessage
            defaultMessage="Price"
        />
      </S.Column>
      <S.Column>
        <FormattedMessage
            defaultMessage="Quantity"
        />
      </S.Column>
      <S.Column>
        <FormattedMessage
            defaultMessage="Total Price"
        />
      </S.Column>
    </S.Wrapper>
  );
};

export { CartHeader };

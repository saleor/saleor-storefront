import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductDescription: React.FC<IProps> = ({
  attributes,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.AttributeList>
        {attributes.map(attribute => (
          <li>
            <S.AttributeName>{attribute.name}: </S.AttributeName>{" "}
            {attribute.value}
          </li>
        ))}
      </S.AttributeList>
    </S.Wrapper>
  );
};

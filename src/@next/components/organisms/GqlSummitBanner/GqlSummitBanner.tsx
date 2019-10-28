import React from "react";

import * as S from "./styles";

const RUN_ID = "Pmq5NZJ";
const EXP_NAME = "checkout-btn";

export const GqlSummitBanner: React.FC = () => {
  const [variant, setVariant] = React.useState(null);

  React.useEffect(() => {
    setVariant(sdk.activeSet[EXP_NAME]);
  }, []);

  const handleVariantClick = React.useCallback((variantName: string) => {
    sdk.__DEBUG__selectVariant({ runId: RUN_ID, variantName });
  }, []);

  return (
    <S.Wrapper>
      <S.Block>
        <img src="data:image/png;base64,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" />
        <S.Text>
          <b>HELLO GRAPHQL SUMMIT.</b>
        </S.Text>
      </S.Block>
      <S.Block>
        <S.HelperText>Warning A/B testing in progress.</S.HelperText>
        <S.Panel>
          <S.Text>Version: </S.Text>
          <S.Flex>
            <S.BaseButton
              selected={variant === "baseline"}
              onClick={() => handleVariantClick("baseline")}
            >
              BASE
            </S.BaseButton>
            <S.SquareButton
              selected={variant === "b"}
              onClick={() => handleVariantClick("b")}
            >
              B
            </S.SquareButton>
            <S.SquareButton
              selected={variant === "c"}
              onClick={() => handleVariantClick("c")}
            >
              C
            </S.SquareButton>
          </S.Flex>
        </S.Panel>
      </S.Block>
    </S.Wrapper>
  );
};

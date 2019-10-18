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
        <img src="https://s3-alpha-sig.figma.com/img/3dfc/f911/4ac5a547a7f7404c020cc33ef64d8f6d?Expires=1572220800&amp;Signature=dmS6olVgpwoAZgw2yCx8u7TGiaLv1vJj4eYX1ns42t4Gi4LYnQ6d5DnxxAxWg88t1ekdwipoLF1l3TFD-2FORIAOh46jXtMfdlaxvCS~YttfFXuDphKg7hNGEo5ATIdEq1z1TRtUjYUPtOZRWtjGW9AQA9-okxmwo0iKOiULD7XuzIAfNUTKLmMpeBxGcQUe87f-mxdAtb8TyZrFsuflD12eG2U5cXorb6PaXIKO7sEYa-o56cW1aIPQRF~qasZM9LWWw6zzGkw1NJh1OPuMaBrhd2ijqgPrwZtHsh~ZJipmuvDvw5T5smsQhrQPQ5apxIhJqJXidxwo46SW0zKlgg__&amp;Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
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

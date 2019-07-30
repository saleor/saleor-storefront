import { Trans } from "@lingui/react";
import React from "react";

import { ButtonLink } from "@components/atoms";
import { CardHeader } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const SizeOverlay: React.FC<IProps> = ({
  hide,
  show,
  target,
}: IProps) => {
  return (
    <Overlay hide={hide} position="right" show={show} target={target}>
      <S.Overlay>
        <CardHeader divider onHide={hide}>
          <Trans id="Please select size" />
        </CardHeader>
        <S.Footer>
          <ButtonLink color="secondary">
            <Trans id="Show size table" />
          </ButtonLink>
        </S.Footer>
      </S.Overlay>
    </Overlay>
  );
};

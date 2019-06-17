import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const SocialMediaIcon: React.FC<IProps> = ({
  medium,
  target,
}: IProps) => (
  <a
    href={medium.href}
    target={target || "_blank"}
    aria-label={medium.ariaLabel}
  >
    <S.Icon path={medium.path} />
  </a>
);

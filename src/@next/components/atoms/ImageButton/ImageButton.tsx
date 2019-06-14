import React from "react";
import ReactSVG from "react-svg";

import editIcon from "images/editIcon.svg";
import trashIcon from "images/trashIcon.svg";

import * as S from "./styles";
import { IProps } from "./types";

const iconTypes = new Map();

iconTypes.set("edit", editIcon);
iconTypes.set("trash", trashIcon);

export const ImageButton: React.FC<IProps> = ({ type }) => {
  return (
    <S.ImageButton>
      {iconTypes.has(type) && <ReactSVG path={iconTypes.get(type)} />}
    </S.ImageButton>
  );
};

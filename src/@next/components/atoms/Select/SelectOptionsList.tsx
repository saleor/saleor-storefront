import React from "react";

import { Trans } from "@lingui/react";
import * as S from "./styles";

interface IProps {
  options: string[];
  selected: string;
  onClick: (arg0: string) => void;
  ref: React.Ref<HTMLDivElement>;
}

const getRef = (isSelected: boolean, ref: React.Ref<HTMLDivElement>) =>
  isSelected && { ref };

export const SelectOptionsList = React.forwardRef<HTMLDivElement, IProps>(
  ({ options, selected, onClick }, ref) =>
    options.length ? (
      <>
        {options.map((option: string) => {
          const isSelected = selected === option;
          return (
            <S.FocusedOption
              selected={isSelected}
              {...getRef(isSelected, ref)}
              key={option}
              onClick={e => {
                onClick(option);
              }}
            >
              {option}
            </S.FocusedOption>
          );
        })}
      </>
    ) : (
      <S.FocusedOption>
        <Trans id="No Options" />
      </S.FocusedOption>
    )
);

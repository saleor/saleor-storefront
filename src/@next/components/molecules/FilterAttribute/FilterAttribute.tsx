import React from "react";

import { ButtonLink } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const FilterAttribute: React.FC<IProps> = ({ name, values }: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(false);
  return (
    <S.Wrapper>
      <S.Header>{name}</S.Header>
      {values.map((value, index) => {
        const ref = React.useRef<HTMLDivElement>(null);
        if (!viewAllOptions && index > 5) {
          <></>;
        } else {
          return (
            <S.Checkbox>
              {value.name}
              <S.Label>
                <input tabIndex={-1} type="checkbox" name={value.name} />
                <div
                  ref={ref}
                  tabIndex={0}
                  onKeyDown={evt => {
                    if (evt.which === 32 || evt.which === 13) {
                      evt.preventDefault();
                    }
                  }}
                  onClick={evt => {
                    evt.preventDefault();
                    if (ref.current) {
                      ref.current.blur();
                    }
                  }}
                >
                  <span></span>
                </div>
              </S.Label>
            </S.Checkbox>
          );
        }
      })}
      {!viewAllOptions && (
        <ButtonLink
          size="sm"
          color="secondary"
          onClick={() => setViewAllOptions(true)}
        >
          VIEW ALL OPTIONS
        </ButtonLink>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};

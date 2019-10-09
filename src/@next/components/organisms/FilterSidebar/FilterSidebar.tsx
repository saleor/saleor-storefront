import React from "react";

import { Overlay } from "../";

import { IconButton } from "@components/atoms";
import { FilterAttribute } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "../../../hooks";
import * as S from "./styles";
import { IProps } from "./types";

export const FilterSidebar: React.FC<IProps> = ({
  target,
  hide,
  show,
  attributes,
  filters,
  onAttributeFiltersChange,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });
  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      target={target}
      transparent
    >
      <S.Wrapper ref={setElementRef()}>
        <S.Header>
          <span>FILTERS</span>
          <IconButton onClick={hide} name="x" size={18} color="000" />
        </S.Header>
        {attributes.map(attribute => {
          return (
            <FilterAttribute
              filters={filters}
              onAttributeFiltersChange={onAttributeFiltersChange}
              slug={attribute.slug}
              name={attribute.name}
              values={attribute.values}
            />
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};

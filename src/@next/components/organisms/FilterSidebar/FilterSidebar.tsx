import React from "react";

import { IconButton } from "@components/atoms";
import { AttributeValuesChecklist } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";

import { Overlay } from "../";
import { IFilterAttributeValue, IFilters } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

export const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: IFilterAttributeValue,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  show,
  attributes,
  target,
  onAttributeValueClick,
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
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-cy="filter-sidebar">
        <S.Header>
          <span>FILTERS</span>
          <IconButton onClick={hide} name="x" size={18} color="000" />
        </S.Header>
        {attributes.map(({ id, name, slug, values }) => {
          return (
            <AttributeValuesChecklist
              key={id}
              title={name}
              name={slug}
              values={values}
              valuesShowLimit
              onValueClick={value => onAttributeValueClick(slug, value.slug)}
            />
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};

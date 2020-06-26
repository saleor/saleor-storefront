import React from "react";
import { FormattedMessage } from "react-intl";

import { IconButton } from "@components/atoms";
import { AttributeValuesChecklist } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "@temp/intl";

import { Overlay } from "..";
import { IFilters, ISingleFilterAttribute } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    }
    return false;
  }
  return false;
};

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  filters,
  show,
  attributes,
  target,
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
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
        <S.Header>
          <span>
            <FormattedMessage {...commonMessages.filterHeader} />
          </span>
          <IconButton
            testingContext="hideFilters"
            onClick={hide}
            name="x"
            size={18}
            color="000"
          />
        </S.Header>
        {attributes.map(({ id, name, slug, values }) => {
          return (
            <AttributeValuesChecklist
              key={id}
              title={name}
              name={slug}
              values={values.map(value => ({
                ...value,
                selected: checkIfAttributeIsChecked(filters, value, slug),
              }))}
              valuesShowLimit
              onValueClick={value => onAttributeFiltersChange(slug, value.slug)}
            />
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};

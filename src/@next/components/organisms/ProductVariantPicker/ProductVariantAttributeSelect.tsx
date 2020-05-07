import React from "react";

import { Icon, Input } from "@components/atoms";
import { InputSelect } from "@components/molecules";
import { useSelectableProductVariantsAttributeValues } from "@hooks";
import { ProductDetails_product_variants } from "@sdk/queries/types/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
} from "@types";

import { SelectSidebar } from "../SelectSidebar";
import * as S from "./styles";

export const ProductVariantAttributeSelect: React.FC<{
  selectSidebar: boolean;
  selectSidebarTarget?: HTMLElement | null;
  productVariantsAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  onChangeSelection: (value: any, name?: any) => void;
  onClearSelection: () => void;
}> = ({
  selectSidebar = false,
  selectSidebarTarget,
  productVariantsAttributeId,
  productVariants,
  productVariantsAttribute,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
}) => {
  const [showSelectSidebar, setShowSelectSidebar] = React.useState(false);

  const selectableProductVariantsAttributeValues = useSelectableProductVariantsAttributeValues(
    productVariantsAttributeId,
    productVariants,
    productVariantsAttributesSelectedValues
  );

  const selectedValue = productVariantsAttributesSelectedValues &&
    productVariantsAttributesSelectedValues[productVariantsAttributeId] && {
      disabled: false,
      id: productVariantsAttributesSelectedValues[productVariantsAttributeId]!
        .id,
      label: productVariantsAttributesSelectedValues[
        productVariantsAttributeId
      ]!.name!,
      value: productVariantsAttributesSelectedValues[
        productVariantsAttributeId
      ]!.value!,
    };

  const attributeOptions = productVariantsAttribute.values
    .filter(value => value)
    .map(value => {
      const isOptionDisabled =
        selectableProductVariantsAttributeValues[productVariantsAttributeId] &&
        !selectableProductVariantsAttributeValues[
          productVariantsAttributeId
        ].values.includes(value);

      return {
        disabled: isOptionDisabled,
        id: value.id,
        label: value.name!,
        value: value.value!,
      };
    });

  const selectLabel = productVariantsAttribute.attribute.name
    ? productVariantsAttribute.attribute.name!
    : "";

  const selectedValuesList = selectedValue ? [selectedValue.value] : [];

  const disabledValuesList = attributeOptions
    .filter(optionValue => optionValue.disabled)
    .map(optionValue => optionValue.value);

  const handleSelectValueInSidebar = (optionValue: string) => {
    if (
      disabledValuesList.every(disabledValue => disabledValue !== optionValue)
    ) {
      onChangeSelection(optionValue);
      setShowSelectSidebar(false);
    }
  };

  const getRightInputContent = (isInputFilled: boolean) => {
    if (isInputFilled) {
      return (
        <S.SelectIndicator onClick={onClearSelection}>
          <Icon name="select_x" size={10} />
        </S.SelectIndicator>
      );
    } else {
      return (
        <S.SelectIndicator onClick={() => setShowSelectSidebar(true)}>
          <Icon name="subcategories" size={10} />
        </S.SelectIndicator>
      );
    }
  };

  if (selectSidebar) {
    return (
      <>
        <Input
          onFocus={() => setShowSelectSidebar(true)}
          label={selectLabel}
          value={selectedValue ? selectedValue.value : ""}
          onChange={() => null}
          contentRight={getRightInputContent(!!selectedValue)}
          readOnly={true}
        />
        <SelectSidebar
          options={attributeOptions}
          selectedOptions={selectedValuesList}
          disabledOptions={disabledValuesList}
          title={`Please select ${selectLabel}`}
          show={showSelectSidebar}
          hide={() => setShowSelectSidebar(false)}
          onSelect={handleSelectValueInSidebar}
          target={selectSidebarTarget}
        />
      </>
    );
  } else {
    return (
      <InputSelect
        name={productVariantsAttribute.attribute.id}
        label={selectLabel}
        value={selectedValue}
        options={attributeOptions}
        isOptionDisabled={optionValue => optionValue.disabled}
        onChange={optionValue =>
          onChangeSelection(optionValue && optionValue.value)
        }
        clearable={true}
        clearValue={onClearSelection}
      />
    );
  }
};

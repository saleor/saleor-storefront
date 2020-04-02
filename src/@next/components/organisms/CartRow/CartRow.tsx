import React, { useEffect, useState } from "react";

import { Icon, IconButton, Input } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

const QuantityButtons = (
  add: () => void,
  substract: () => void,
  id?: string
) => (
  <S.QuantityButtons>
    <div onClick={substract} data-cy={`cartPageItem${id}QuantityBtnSubtract`}>
      <Icon size={16} name="horizontal_line" />
    </div>
    <div onClick={add} data-cy={`cartPageItem${id}QuantityBtnAdd`}>
      <Icon size={16} name="plus" />
    </div>
  </S.QuantityButtons>
);

/**
 * Product row displayed on cart page
 */
export const CartRow: React.FC<IProps> = ({
  id,
  totalPrice,
  unitPrice,
  name,
  sku,
  quantity,
  onQuantityChange,
  thumbnail,
  attributes = [],
  onRemove,
}: IProps) => {
  const [tempQuantity, setTempQuantity] = useState<number | string>(quantity);

  const handleBlurQuantityInput = () => {
    const newQuantity =
      typeof tempQuantity === "number"
        ? tempQuantity
        : parseInt(tempQuantity, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      setTempQuantity(quantity);
    }
  };

  useEffect(() => {
    setTempQuantity(quantity);
  }, [quantity]);

  const add = React.useCallback(() => onQuantityChange(quantity + 1), [
    quantity,
  ]);
  const substract = React.useCallback(
    () => quantity > 1 && onQuantityChange(quantity - 1),
    [quantity]
  );
  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(newQuantity);
    } else {
      setTempQuantity(evt.target.value);
    }
  };

  return (
    <S.Wrapper>
      <S.Photo>
        <CachedImage data-cy={`cartPageItem${id}Image`} {...thumbnail} />
      </S.Photo>
      <S.Description>
        <S.Name data-cy={`cartPageItem${id}Name`}>{name}</S.Name>
        <S.Sku>
          <S.LightFont>
            SKU: <span data-cy={`cartPageItem${id}SKU`}>{sku ? sku : "-"}</span>
          </S.LightFont>
        </S.Sku>
        <S.Attributes data-cy={`cartPageItem${id}Attributes`}>
          {attributes.map(({ attribute, values }) => (
            <S.SingleAttribute key={attribute.id}>
              <span data-cy={`cartPageItem${id}SingleAttribute${attribute.id}`}>
                <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                {values.map(value => value.name).join(", ")}
              </span>
            </S.SingleAttribute>
          ))}
        </S.Attributes>
      </S.Description>
      <S.Quantity>
        <Input
          data-cy={`cartPageItem${id}QuantityInput`}
          name="quantity"
          label="Quantity"
          value={tempQuantity}
          onBlur={handleBlurQuantityInput}
          onChange={handleQuantityChange}
          contentRight={QuantityButtons(add, substract, id)}
        />
      </S.Quantity>
      <S.Trash>
        <IconButton
          data-cy={`cartPageItem${id}BtnRemove`}
          size={22}
          name="trash"
          onClick={onRemove}
        />
      </S.Trash>

      <S.TotalPrice>
        <S.PriceLabel>
          <S.LightFont>Total Price:</S.LightFont>
        </S.PriceLabel>
        <p>{totalPrice}</p>
      </S.TotalPrice>
      <S.UnitPrice>
        <S.PriceLabel>
          <S.LightFont>Price:</S.LightFont>
        </S.PriceLabel>
        <p>{unitPrice}</p>
      </S.UnitPrice>
    </S.Wrapper>
  );
};

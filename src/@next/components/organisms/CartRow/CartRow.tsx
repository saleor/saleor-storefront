import React, { useState, useEffect } from "react";

import { Icon, IconButton, Input } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

const QuantityButtons = (add: () => void, substract: () => void) => (
  <S.QuantityButtons>
    <div onClick={substract}>
      <Icon size={16} name="horizontal_line" />
    </div>
    <div onClick={add}>
      <Icon size={16} name="plus" />
    </div>
  </S.QuantityButtons>
);

/**
 * Product row displayed on cart page
 */
export const CartRow: React.FC<IProps> = ({
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
  const [tempQuantity, setTempQuantity] = useState(quantity);

  const handleBlurQuantityInput = () => {
    if (tempQuantity <= 0) {
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
    const newQuantity = evt.target.value;
    if (newQuantity !== "" && newQuantity > 0) {
      onQuantityChange(newQuantity);
    } else {
      setTempQuantity(newQuantity);
    }
  };

  return (
    <S.Wrapper>
      <S.Photo>
        <CachedImage {...thumbnail} />
      </S.Photo>
      <S.Description>
        <S.Name>{name}</S.Name>
        <S.Sku>
          <S.LightFont>SKU: {sku ? sku : "-"}</S.LightFont>
        </S.Sku>
        <S.Attributes>
          {attributes.map(({ attribute, values }) => (
            <S.SingleAttribute key={attribute.id}>
              <span>
                <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                {values.map(value => value.name).join(", ")}
              </span>
            </S.SingleAttribute>
          ))}
        </S.Attributes>
      </S.Description>
      <S.Quantity>
        <Input
          name="quantity"
          label="Quantity"
          value={tempQuantity}
          onBlur={handleBlurQuantityInput}
          onChange={handleQuantityChange}
          contentRight={QuantityButtons(add, substract)}
        />
      </S.Quantity>
      <S.Trash>
        <IconButton size={22} name="trash" onClick={onRemove} />
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

import React from "react";

import { Icon, IconButton, Input } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

const QuantityButtons = (add, substract) => (
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
  const add = React.useCallback(() => onQuantityChange(quantity + 1), [
    quantity,
  ]);
  const substract = React.useCallback(() => onQuantityChange(quantity - 1), [
    quantity,
  ]);
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
          value={quantity}
          onChange={evt => onQuantityChange(evt.target.value)}
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

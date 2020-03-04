import React from "react";

import { IconButton, Input } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const CartRow: React.FC<IProps> = ({
  totalPrice,
  unitPrice,
  name,
  sku,
  quantity,
  thumbnail,
  attributes,
  onRemove,
}: IProps) => {
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
          {attributes.map(attribute => (
            <S.SingleAttribute>
              <span>
                <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                {attribute.values.map(value => value.value).join(", ")}
              </span>
            </S.SingleAttribute>
          ))}
        </S.Attributes>
      </S.Description>
      <S.Quantity>
        <Input name="quantity" label="Quantity" value={quantity} />
      </S.Quantity>
      <S.Trash>
        <IconButton size={22} name="trash" onClick={onRemove} />
      </S.Trash>

      <S.TotalPrice>
        <S.PriceLabel>
          <S.LightFont>Total Price</S.LightFont>
        </S.PriceLabel>
        {totalPrice}
      </S.TotalPrice>
      <S.UnitPrice>
        <S.PriceLabel>
          <S.LightFont>Price</S.LightFont>
        </S.PriceLabel>
        {unitPrice}
      </S.UnitPrice>
    </S.Wrapper>
  );
};

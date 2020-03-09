import React from "react";

import { Icon, IconButton, Input } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

const QuantityButtons = (onAdd, onSubstract, processing) => (
  <S.QuantityButtons processing={processing}>
    <div onClick={onSubstract}>
      <Icon size={16} name="horizontal_line" />
    </div>
    <div onClick={onAdd}>
      <Icon size={16} name="plus" />
    </div>
  </S.QuantityButtons>
);

export const CartRow: React.FC<IProps> = ({
  totalPrice,
  unitPrice,
  name,
  processing = false,
  sku,
  quantity,
  thumbnail,
  attributes = [],
  onRemove,
  onAdd,
  onSubstract,
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
                <S.LightFont>{attribute.attribute.name}:</S.LightFont>{" "}
                {attribute.values.map(value => value.name).join(", ")}
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
          readOnly={true}
          disabled={processing}
          contentRight={QuantityButtons(onAdd, onSubstract, processing)}
        />
      </S.Quantity>
      <S.Trash>
        <IconButton size={22} name="trash" onClick={onRemove} />
      </S.Trash>

      <S.TotalPrice>
        <S.PriceLabel>
          <S.LightFont>Total Price</S.LightFont>
        </S.PriceLabel>
        <p>{totalPrice}</p>
      </S.TotalPrice>
      <S.UnitPrice>
        <S.PriceLabel>
          <S.LightFont>Price</S.LightFont>
        </S.PriceLabel>
        <p>{unitPrice}</p>
      </S.UnitPrice>
    </S.Wrapper>
  );
};

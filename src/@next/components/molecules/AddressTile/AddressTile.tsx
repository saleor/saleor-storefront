import React from "react";

import { Address, DropdownMenu, IconButton, Tile } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

const defaultShippingAddress = (
  <S.MenuItem>Set as default shipping address</S.MenuItem>
);
const defaultBillingAddress = (
  <S.MenuItem>Set as default billing address</S.MenuItem>
);

export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  address,
}: IProps) => {
  const header = (
    <S.HeaderContent>
      <DropdownMenu
        type="clickable"
        header={<IconButton name="expand" size={24} />}
        items={[
          {
            content: defaultBillingAddress,
            onClick: () => {
              setDefault("BILLING");
            },
          },
          {
            content: defaultShippingAddress,
            onClick: () => {
              setDefault("SHIPPING");
            },
          },
        ]}
      />

      {address.isDefaultBillingAddress && address.isDefaultShippingAddress
        ? "Default Address"
        : address.isDefaultShippingAddress
        ? "Default Shipping Address"
        : address.isDefaultBillingAddress
        ? "Default Billing Address"
        : null}
    </S.HeaderContent>
  );
  const footer = (
    <S.FooterContent>
      <div>
        <IconButton name="edit" onClick={onEdit} size={22} />
      </div>
      <div>
        <IconButton name="trash" onClick={onRemove} size={19} />
      </div>
    </S.FooterContent>
  );

  const content = <Address {...address} />;
  return (
    <S.Wrapper>
      <Tile footer={footer} header={header}>
        {content}
      </Tile>
    </S.Wrapper>
  );
};

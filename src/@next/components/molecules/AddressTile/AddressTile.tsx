import { Trans } from "@lingui/react";
import React from "react";

import { Address, DropdownMenu, IconButton, Tile } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

const defaultShippingAddress = <Trans id="Set as default shipping address" />;
const defaultBillingAddress = <Trans id="Set as default billing address" />;

export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  isDefaultBillingAddress,
  isDefaultShippingAddress,
  address,
}: IProps) => {
  const header = (
    <S.HeaderContent>
      {isDefaultBillingAddress && isDefaultShippingAddress ? (
        <Trans id="Default Address" />
      ) : isDefaultShippingAddress ? (
        <Trans id="Default Shipping Address" />
      ) : isDefaultBillingAddress ? (
        <Trans id="Default Billing Address" />
      ) : null}

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

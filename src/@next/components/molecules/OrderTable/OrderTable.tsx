import Link from "next/link";
import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { TaxedMoney } from "@components/containers";
import { paths } from "@paths";
import { commonMessages, translateOrderStatus } from "@temp/intl";

import { generateProductUrl } from "../../../../core/utils";
import { Thumbnail } from "..";
import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>
      <FormattedMessage defaultMessage="Index Number" />
    </S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>
          <FormattedMessage defaultMessage="Products Ordered" />
        </S.ProductsOrdered>
        <S.DateOfOrder>
          <FormattedMessage defaultMessage="Date of Order" />
        </S.DateOfOrder>
        <S.Value>
          <FormattedMessage defaultMessage="Value" />
        </S.Value>
      </>
    )}
    <S.Status>
      <FormattedMessage {...commonMessages.status} />
    </S.Status>
  </S.HeaderRow>
);

export const OrderTable: React.FC<IProps> = ({ orders, isGuest }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>{header(matches)}</S.Row>
              {orders &&
                orders.map(order => {
                  const date = new Date(order.node.created);
                  return (
                    <Link
                      href={{
                        pathname: isGuest
                          ? paths.guestOrderDetail
                          : paths.accountOrderDetail,
                        query: { token: order.node.token },
                      }}
                      key={order.node.number}
                    >
                      <S.Row
                        data-test="orderEntry"
                        data-test-id={order.node.number}
                        key={order.node.number}
                      >
                        <S.IndexNumber>{order.node.number}</S.IndexNumber>
                        {matches ? (
                          <>
                            <S.ProductsOrdered>
                              {order.node.lines
                                .slice(0, 5)
                                .map((product: any) => (
                                  <Link
                                    href={generateProductUrl(
                                      product.variant.product.id,
                                      product.variant.product.name
                                    )}
                                    key={product.variant.product.id}
                                  >
                                    <a>
                                      <Thumbnail source={product} />
                                    </a>
                                  </Link>
                                ))}
                            </S.ProductsOrdered>
                            <S.DateOfOrder>
                              <FormattedDate value={date} />
                            </S.DateOfOrder>
                            <S.Value>
                              <TaxedMoney taxedMoney={order.node.total} />
                            </S.Value>
                          </>
                        ) : (
                          ""
                        )}
                        <S.Status>
                          {translateOrderStatus(order.node.statusDisplay, intl)}
                        </S.Status>
                      </S.Row>
                    </Link>
                  );
                })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};

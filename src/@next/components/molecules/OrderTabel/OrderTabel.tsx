import { DateFormat, Trans } from "@lingui/react";
import React from "react";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { Thumbnail } from "..";
import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const Header = (
  <S.HeaderRow>
    <S.IndexNumber>
      <Trans id="Index Number" />
    </S.IndexNumber>
    <S.ProductsOrdered>
      <Trans id="Products Ordered" />
    </S.ProductsOrdered>
    <S.DateOfOrder>
      <Trans id="Date of Order" />
    </S.DateOfOrder>
    <S.Value>
      <Trans id="Value" />
    </S.Value>
    <S.Status>
      <Trans id="Status" />
    </S.Status>
  </S.HeaderRow>
);

export const OrderTabel: React.FC<IProps> = ({ orders, history }: IProps) => {
  const theme = React.useContext(ThemeContext);
  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.mediumScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>{Header}</S.Row>
              {orders.map(order => {
                return (
                  <S.Row
                    onClick={evt => {
                      evt.stopPropagation();
                      history.push(`/order/${order.node.token}`);
                    }}
                  >
                    <S.IndexNumber>{order.node.number}</S.IndexNumber>
                    {matches ? (
                      <>
                        <S.ProductsOrdered>
                          {order.node.lines
                            .slice(0, 5)
                            .map((product, index) => (
                              <Thumbnail
                                onClick={evt => {
                                  evt.stopPropagation();
                                  history.push(
                                    generateProductUrl(
                                      product.variant.product.id,
                                      product.variant.product.name
                                    )
                                  );
                                }}
                                source={product}
                              />
                            ))}
                        </S.ProductsOrdered>
                        <S.DateOfOrder>
                          <DateFormat value={order.node.created} />
                        </S.DateOfOrder>
                        <S.Value>{order.node.total.gross.localized}</S.Value>
                      </>
                    ) : (
                      ""
                    )}
                    <S.Status>{order.node.statusDisplay}</S.Status>
                  </S.Row>
                );
              })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};

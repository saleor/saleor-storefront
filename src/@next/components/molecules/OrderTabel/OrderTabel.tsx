import React from "react";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { TaxedMoney } from "@components/containers";

import { Thumbnail } from "..";
import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>Index Number</S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>Products Ordered</S.ProductsOrdered>
        <S.DateOfOrder>Date of Order</S.DateOfOrder>
        <S.Value>Value</S.Value>
      </>
    )}
    <S.Status>Status</S.Status>
  </S.HeaderRow>
);

export const OrderTabel: React.FC<IProps> = ({ orders, history }: IProps) => {
  const theme = React.useContext(ThemeContext);
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
                    <S.Row
                      data-testid="order__row"
                      key={order.node.number}
                      onClick={evt => {
                        evt.stopPropagation();
                        history.push(`/order-history/${order.node.token}`);
                      }}
                    >
                      <S.IndexNumber>{order.node.number}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.node.lines
                              .slice(0, 5)
                              .map((product: any) => (
                                <span
                                  key={product.variant.product.id}
                                  onClick={evt => {
                                    evt.stopPropagation();
                                    history.push(
                                      generateProductUrl(
                                        product.variant.product.id,
                                        product.variant.product.name
                                      )
                                    );
                                  }}
                                >
                                  <Thumbnail source={product} />
                                </span>
                              ))}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            {`${date.getMonth() +
                              1}/${date.getDate()}/${date.getFullYear()}`}
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.node.total} />
                          </S.Value>
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

import React, { useState } from "react";
import PageHeader from "../../../components/Header/PageHeader";
import { Select } from "../../../@next/components/atoms/Select";
import { CardBlock } from "./CardBlock";
import { CartInterface } from "@temp/components/CartProvider/context";

interface IPageProps {
  history: any;
  products: any;
  cart: CartInterface;
}

export const Page = ({ products, history, cart }: IPageProps) => {
  const handleClick = () => {
    history.goBack();
  };

  const onChange = () => {
    return 1;
  };

  return (
    <div className="inner-page-wrapper items-inner-page">
      <PageHeader
        back={true}
        cart={true}
        search={true}
        handleClick={handleClick}
      />
      <div>
        <div className="wrapper-header">Set Details</div>
        <div className="wrapper-sub-header">
          <h5>Filter cabinets By dimensions</h5>
        </div>
        <div className="select-value">
          <div className="select-value--item">
            <Select
              value={10}
              onChange={value => onChange()}
              placeholder="Width"
            />
          </div>
          <div className="select-value--item">
            <Select
              value={10}
              onChange={value => onChange()}
              placeholder="Height"
            />
          </div>
          <div className="select-value--item">
            <Select
              value={10}
              onChange={value => onChange()}
              placeholder="Depth"
            />
          </div>
        </div>
        <div className="addcart-card-wrapper">
          {products.map(({ node }) => {
            return <CardBlock add={cart.add} node={node} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;

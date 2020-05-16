import React, { useState } from "react";
import PageHeader from "../../../components/Header/PageHeader";
import { Select } from "../../../@next/components/atoms/Select";
import { CardBlock } from "./CardBlock";

export const Page = props => {
  const [quantity, setQuantity] = useState(0);
  const handleClick = () => {
    props.history.goBack();
  };

  const onChange = () => {
    return 1;
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevState => prevState - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevState => prevState + 1);
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
          <CardBlock
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            quantity={quantity}
          />
          <CardBlock
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            quantity={quantity}
          />
          <CardBlock
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            quantity={quantity}
          />
          <CardBlock
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            quantity={quantity}
          />
          <CardBlock
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

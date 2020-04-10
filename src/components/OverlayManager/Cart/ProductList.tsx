import * as React from "react";
import { Link } from "react-router-dom";
// import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import { LineI } from "../../CartTable/ProductRow";

const ProductList: React.SFC<{
  lines: LineI[];
  remove(variantId: string): void;
}> = ({ lines, remove }) => (
  <ul className="cart__list">
    {lines.map(line => {
      const productUrl = generateProductUrl(line.product.id, line.product.name);
      return (
        <li key={line.id} className="cart__list__item">
          <Link to={productUrl}>
            <Thumbnail source={line.product} />
          </Link>
          <div className="cart__list__item__details">
            <Link to={productUrl}>
              <p>{line.product.name}</p>
            </Link>
            <div className="cart__list__item__details__variant">
              <span>SKU: {`W1230-CYOHH`}</span>
              <span>Dimension: {`10"w x 12"h x 24"d`}</span>
            </div>
            <div className="cart__list__item__details__pricing">
              <p>
                <TaxedMoney taxedMoney={line.pricing.price} />
              </p>
              <QauntSelect quantity={line.quantity} />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);

const QauntSelect: React.SFC<any> = props => {
  const [quantity, setQuantity] = React.useState(props.quantity || 0);

  function increment() {
    if ((quantity + 1) > 10) {
      return;
    }
    setQuantity(quantity + 1);
  }

  function decrement() {
    if ((quantity - 1) < 0) {
      return;
    }
    setQuantity(quantity - 1);
  }

  // @todo: implement update lineItem quantity graphql

  return <div className="quantselect">
    <button
      onClick={decrement}
      className="quantselect__increment">
        -
    </button>
    <span className="quantselect__itemquantity">{quantity}</span>
    <button
      onClick={increment}
      className="quantselect__increment">
        +
    </button>
  </div>
}

export default ProductList;

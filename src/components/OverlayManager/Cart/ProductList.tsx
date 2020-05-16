import * as React from "react";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { LineI } from "../../CartTable/ProductRow";

const ProductList: React.SFC<{
  lines: LineI[];
  remove(variantId: string): void;
  add(variantId: string, quantity: number): void;
  subtract(variantId: string, quantity: number): void;
}> = ({ lines, remove, add, subtract }) => (
  <ul className="cart__list">
    {lines.map(line => {
      return (
        <li key={line.id} className="cart__list__item">
          <Thumbnail source={line.product} />
          <div className="cart__list__item__details">
            <p>{line.product.name}</p>
            <div className="cart__list__item__details__variant">
              <span>SKU: {`W1230-CYOHH`}</span>
              <span>Dimension: {`10"w x 12"h x 24"d`}</span>
            </div>
            <div className="cart__list__item__details__pricing">
              <p>
                <TaxedMoney taxedMoney={line.pricing.price} />
              </p>
              <QauntSelect
                id={line.id}
                quantity={line.quantity}
                add={add}
                subtract={subtract}
              />
            </div>
          </div>
          <div className="cart__remove" onClick={() => remove(line.id)}>
            x
          </div>
        </li>
      );
    })}
  </ul>
);

const QauntSelect: React.SFC<any> = props => {
  const [quantity, setQuantity] = React.useState(props.quantity || 0);

  function increment() {
    if (quantity + 1 > 10) {
      return;
    }
    props.add(props.id, 1);
    setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity - 1 < 0) {
      return;
    }
    props.subtract(props.id, 1);
    setQuantity(quantity - 1);
  }

  return (
    <div className="quantselect">
      <button onClick={decrement} className="quantselect__increment">
        -
      </button>
      <span className="quantselect__itemquantity">{quantity}</span>
      <button onClick={increment} className="quantselect__increment">
        +
      </button>
    </div>
  );
};

export default ProductList;

import doubleDoorImg from "images/P_double_door.png";
import * as React from "react";

enum AttributeNames {
  Dimemsions = "Dimensions",
}

function getAttributes(attributes: any) {
  return attributes.map(att => {
    return {
      attribute: att.attribute.name,
      value: att.values[0] ? att.values[0].name : null,
    };
  });
}

function findField(fields: any, name: string) {
  const founded = fields.find(f => f.attribute === name);
  return founded ? founded.value : null;
}

export const CardBlock = ({ node, add }) => {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const attributes = getAttributes(node.attributes);
  const firstVariantId = node.variants[0].id;
  function addItems() {
    if (!count || !node.id) {
      return;
    }
    setLoading(true);
    add(firstVariantId, count);
    setCount(0);
    setTimeout(() => setLoading(false), 1000);
  }
  const dimensions = findField(attributes, AttributeNames.Dimemsions);
  const sku = node.variants[0].sku;
  return (
    <div className="addcart-card">
      <div className="addcart-card--img">
        <div className="img-wrapper">
          <img src={doubleDoorImg} alt="Avatar" />
          <div className="small-img"></div>
        </div>
      </div>
      <div className="addcart-card-container">
        <div className="addcart-card-container--header">{node.name}</div>

        <div className="addcart-card-container--sub-header">
          {sku && <span>SKU: {sku}</span>}
          {dimensions && <span>Dimensions: {dimensions}</span>}
        </div>

        <div className="addcart-card-container--detail">
          <span className="detail-price">
            <strong>
              ${node.pricing.priceRange.start.gross.amount.toFixed(2)}
            </strong>
          </span>
          <div className="detail-counter">
            <span
              className="qty-operator"
              onClick={() => {
                if (count < 1) {
                  return;
                }
                setCount(count - 1);
              }}
            >
              -
            </span>
            <span className="qty-text">{count}</span>
            <span
              className="qty-operator"
              onClick={() => {
                if (count > 9) {
                  return;
                }
                setCount(count + 1);
              }}
            >
              +
            </span>
          </div>
        </div>

        <div className="addcart-card-container--btn">
          <button onClick={addItems}>
            {" "}
            {loading ? <span>Loading...</span> : <span>Add to Cart</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

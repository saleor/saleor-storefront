import { CartInterface } from "../components/Cart/context";
import { PriceInterface } from "../core/types";

export function getCartTotal(
  cart: CartInterface,
  productsVariants
): PriceInterface {
  const quantityMapping = cart.lines.reduce((obj, line) => {
    obj[line.variantId] = line.quantity;
    return obj;
  }, {});
  const amount = productsVariants.reduce(
    (sum, variant) => sum + variant.price.amount * quantityMapping[variant.id],
    0
  );
  const { currency } = productsVariants[0].price;
  return { amount, currency };
}

export function getVariantQuantity(cart, variantId) {
  const line = cart.lines.filter(line => line.variantId === variantId)[0];
  return line.quantity;
}

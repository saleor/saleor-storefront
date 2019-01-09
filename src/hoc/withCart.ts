import { CartContext, CartInterface } from "../components/CartProvider/context";
import { createHOCFromContext } from "./helpers";

interface HOCProps {
  cart: CartInterface;
}

const withCart = createHOCFromContext<HOCProps>(
  "withCartContext",
  "cart",
  CartContext
);

export default withCart;

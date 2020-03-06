export interface ISaleorCheckoutAPI {
  addItemToCart: (variantId: string, quantity: number) => void;
  load: () => void;
  removeItemFromCart: (variantId: string) => void;
  setBillingAddress: () => void;
  setShippingAddress: () => void;
  setShippingAsBillingAddress: () => void;
  updateItemInCart: (variantId: string, quantity: number) => void;
  makeOrder: () => void;
}

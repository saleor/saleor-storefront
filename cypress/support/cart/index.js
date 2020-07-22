import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { CART_SELECTORS } from "../../elements/cart/cart";

const clearCart = () => {
  return cy.get(HEADER_SELECTORS.cartBtn).then(cartBtn => {
    const found = cartBtn.find(PRODUCTS_SELECTORS.cartQuantity);

    cy.log(found);
    if (found.length > 0) {
      return cy
        .get(HEADER_SELECTORS.cartBtn)
        .click()
        .get(PRODUCTS_SELECTORS.goToBagMyBagBtn)
        .click()
        .get(CART_SELECTORS.deleteItemBtn)
        .click()
        .get(CART_SELECTORS.continueShoppingBtn)
        .click();
    }
  });
};

Cypress.Commands.add("clearCart", clearCart);

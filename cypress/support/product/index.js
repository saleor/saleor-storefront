import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";

Cypress.Commands.add("addItemToTheBasket", () => {
  return cy

    .get(PRODUCTS_SELECTORS.product_list)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.first_selected_product_name)
    .first()
    .invoke("text")
    .as("productName")
    .get(PRODUCTS_SELECTORS.variantPicker)
    .click()
    .get(PRODUCTS_SELECTORS.attributOptions)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.addToBasketBtn)
    .click()
    .get(PRODUCTS_SELECTORS.cartQuantity)
    .should("be.visible")
    .click()
    .get(PRODUCTS_SELECTORS.goToBagMyBagBtn)
    .click();
});

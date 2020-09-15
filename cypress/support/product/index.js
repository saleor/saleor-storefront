import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { SEARCH_PRODUCTS_SELECTORS_RIGHT_MENU } from "../../elements/products/search-products-selectors";

Cypress.Commands.add("addItemWithShippingToTheBasket", () => {
  return cy

    .get(PRODUCTS_SELECTORS.product_list)
    .eq(1)
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

Cypress.Commands.add("addItemWithNoShippingToTheBasket", () => {
  return cy

    .get(HEADER_SELECTORS.mainMenuSearchButton)
    .click()
    .get(HEADER_SELECTORS.mainMenuSearchInput)
    .type("tunes")
    .get(SEARCH_PRODUCTS_SELECTORS_RIGHT_MENU.searchProductsExpandedArea)
    .should("exist")
    .get(SEARCH_PRODUCTS_SELECTORS_RIGHT_MENU.searchItems)
    .first()
    .click()
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

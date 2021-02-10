import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { SEARCH_PRODUCTS_SELECTORS_RIGHT_MENU } from "../../elements/products/search-products-selectors";
import { CART_SELECTORS } from "../../elements/cart/cart";

const productWithShippingSearchQuery = "white%20plimsolls";
const productWithoutShippingSearchQuery = "tunes";

Cypress.Commands.add("addItemWithShippingToTheBasket", () => {
  return cy
    .visit(`/search/?q=${productWithShippingSearchQuery}`)
    .get(PRODUCTS_SELECTORS.productTile)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.first_selected_product_name)
    .first()
    .invoke("text")
    .as("productName")
    .get(PRODUCTS_SELECTORS.variantPicker)
    .click()
    .get(PRODUCTS_SELECTORS.attributeOptions)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.addToBasketBtn)
    .click()
    .get(CART_SELECTORS.cartSidebar)
    .should("be.visible")
    .get(CART_SELECTORS.cartSidebarRow)
    .should("be.visible")
    .get(PRODUCTS_SELECTORS.goToCartMyCartBtn)
    .click();
});

Cypress.Commands.add("addItemWithNoShippingToTheBasket", () => {
  return cy
    .visit(`/search/?q=${productWithoutShippingSearchQuery}`)
    .get(PRODUCTS_SELECTORS.productTile)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.variantPicker)
    .click()
    .get(PRODUCTS_SELECTORS.attributeOptions)
    .first()
    .click()
    .get(PRODUCTS_SELECTORS.addToBasketBtn)
    .click()
    .get(CART_SELECTORS.cartSidebar)
    .should("be.visible")
    .get(CART_SELECTORS.cartSidebarRow)
    .should("be.visible")
    .get(PRODUCTS_SELECTORS.goToCartMyCartBtn)
    .click();
});

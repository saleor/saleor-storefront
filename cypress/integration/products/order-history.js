import faker from "faker";

import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { CHECKOUT_SELECTORS } from "../../elements/products/checkout-selectors";
import { ORDER_HISTORY_SELECTORS } from "../../elements/saleor-account/my-account-selectors";

describe("Buy a product and check the order history", () => {
  beforeEach(() => {
    cy.loginUserViaRequest().visit("/").clearCart();
  });

  it("should buy a product and then go to the order history", () => {
    const firstProductName = PRODUCTS_SELECTORS.first_selected_product_name;
    const address = {
      fakeFirstNameText: faker.name.firstName(),
      fakeLastNameInputText: faker.name.lastName(),
      fakeCompanyNameText: faker.company.companyName(),
      fakeAddressLine1Text: faker.address.streetAddress(),
      fakeAddressLine2Text: faker.address.secondaryAddress(),

      phoneNum: "205-201-1178",
      city: "Alabama",
      zipCode: "35005",
      country: "United States of America",
      state: "AL",
    };

    cy.addItemWithShippingToTheBasket()
      .get("@productName")
      .then(productName => {
        return cy
          .get(PRODUCTS_SELECTORS.proceedToCheckoutBtn)
          .click()
          .get(CHECKOUT_SELECTORS.CHECKOUT_LINKS.address)
          .click()
          .get(CHECKOUT_SELECTORS.addNewShippingAddress)
          .first()
          .click()
          .addNewAddress(address)
          .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.addBtn)
          .click()
          .should("not.exist")
          .get(
            CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.shippingAddressTiles
          )
          .last()
          .click()
          .get(
            CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS
              .sameAsShippingAddressCheckbox
          )
          .parent()
          .click()
          .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
          .click()
          .shipping()
          .payment()
          .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.shippingAddressTile)
          .should("contain", address.fakeFirstNameText)
          .and("contain", address.fakeLastNameInputText)
          .and("contain", address.fakeCompanyNameText)
          .and("contain", address.fakeAddressLine1Text)
          .and("contain", address.fakeAddressLine2Text)
          .and("contain", address.city.toUpperCase())
          .and("contain", address.country)
          .and("contain", address.phoneNum.replace(/-/gi, ""))
          .and("contain", address.state)
          .and("contain", address.zipCode)
          .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.placeOrder)
          .click()
          .get(CHECKOUT_SELECTORS.ORDER_FINALIZED.confirmationView)
          .should("be.visible", { timeout: 20000 })
          .get(CHECKOUT_SELECTORS.ORDER_FINALIZED.orderDetails)
          .click()
          .get(ORDER_HISTORY_SELECTORS.cartTable)
          .contains(productName)

          .get(HEADER_SELECTORS.loggedInMainMenuButton)
          .click()
          .get(HEADER_SELECTORS.MAIN_MENU_DROPDOWN_SELECTORS.orderHistory)
          .click()
          .get("@totalPrice")
          .then(totalPrice => {
            return cy
              .get(ORDER_HISTORY_SELECTORS.orderList)
              .get('[data-test="orderEntry"]')
              .first()
              .within(() => {
                return cy
                  .get("div:nth-child(4) span")
                  .invoke("text")
                  .should("eq", totalPrice);
              });
          });
      });
  });
});

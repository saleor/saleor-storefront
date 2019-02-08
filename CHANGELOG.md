# Changelog

All notable, unreleased changes to this project will be documented in this file. For the released changes, please visit the [Releases](https://github.com/mirumee/saleor-storefront/releases) page.

## [Unreleased]

- Handle quantity API errors in the cart #199 by @piotrgrundas
- Fix sticky footer, adjust cart overlay to the mocks, cart summary fixes, fix error if no shipping method found #205 by @piotrgrundas
- Disable ability to continue to billing without shipement chosen #211 by @piotrgrundas
- Set max width of images in product description as 100% #220 by @jxltom
- Refactor checkout, moved to a separate module, creation of checkout after user provides a valid email after first checkout step, change gotocheckout logic #223 by @piotrgrundas
- Update checkout review page styles, fix checkboxes in FF #239 by @piotrgrundas
- Add syncing checkout with after after user logs in. Fix checkoutlogin screen for existing users #243 by @piotrgrundas
- Add checkout creation for logged in users without checkout upon adding to cart - #250 by @piotr grundas

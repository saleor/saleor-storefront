# Changelog

All notable, unreleased changes to this project will be documented in this file. For the released changes, please visit the [Releases](https://github.com/mirumee/saleor-storefront/releases) page.

## [Unreleased]

- Add EditorJS embeded renderer - SALEOR-3354 by @mociepka
- Handle Order confirmation at Thank You page - #956 by @mmarkusik
- Add EditorJS renderer - #947 by @krzysztofwolski
- New cart sidebar - #907 by @orzechdev
- Support for multichannel - #937 by @AlicjaSzu
- Add next.js to the Storefront - #955 by @piotrgrundas
- Fixed image scaling in gallery and thumbnails - #959 by @MarekChoinski
- Use only selection attributes in variant picker - #963 by @orzechdev
- Drop deprecated `ProductVariant.isAvailable` field - #965 by @maarcingebala
- Add eslint import sort - #979 by @pitorgrundas
- Enable incremental server-side regeneration for store pages - #988 by @pitorgrundas
- Update account mutations with channel slug - #1039 by @orzechdev
- Update register mutation with channel slug - #1045 by @orzechdev

## 2.11.0

- Add product hyperlink in cart page - #745 by @konstantinoschristomanos
- Add Cypress tags to all of the buttons (also speed up tests) - #718 by @krzysztofwolski
- Automatically choose variant attributes from url in ProductVariantPicker - #708 by @AlicjaSzu
- Use SDK as a standalone package - #724 by @dominik-zeglen
- Use auth API from SDK - #727 by @orzechdev
- Fix `CartRow` tests - #749 by @dominik-zeglen
- Add prettier to precommit - #766 by @dominik-zeglen
- Do not use prettier on generated files - #773 by @dominik-zeglen
- Add Eslint - #776 by @dominik-zeglen
- Fix storybook config - #789 by @dominik-zeglen
- Update SDK to newest version - #795 by @dominik-zeglen
- Use intl - #782 by @przlada
- Download invoice for order - #790 by @orzechdev
- Do not throw error if unsupported payment gateway found - #819 by @dominik-zeglen
- Fix tsconfig aliases - #824 by @orzechdev
- Set billing address in first checkout step - #822 by @orzechdev
- Persist payment gateways for the whole checkout - #828 by @orzechdev
- Add test tags to address book - #847 by @dominik-zeglen
- Refresh user data if mutation fails - #854 by @dominik-zeglen
- Fix product list data overfetching - #855 by @dominik-zeglen
- Add Adyen payment gateway - #845 by @orzechdev
- Fix crash on null price range - #875 by @orzechdev
- Update collection products query - #879 by @orzechdev
- Fix checkout refreshing - #865 by @orzechdev
- Add purchase availability to product details page - #878 by @orzechdev
- Require payment recreate when payment price is wrong - #892 by @orzechdev
- Handle JWT token refreshing and verifying - #883 by @orzechdev
- Fix cart sidebar style - #897 by @orzechdev
- Refactor variant picker components and open sidebar after adding product to cart - #809 by @krzysztofwolski
- Fix checkout address view - #909 by @konstantinoschristomanos
- Support for static URL - #721 by @marianoeramirez and @dominik-zeglen
- Fix search crashing when displaying item with no category - #928 by @mmarkusik
- Fix generating site map - #915 by @rboixaderg

## 2.10.4

- Fix build errors introduced in version 2.10.3 - by @dominik-zeglen

## 2.10.3

- Stop storing plain text passwords in localStorage - by @dominik-zeglen

## 2.10.2

- Fix fetching `quantityAvailable` field - #738 by @AlicjaSzu

## 2.10.1

- Replace stockQuantity field with quantityAvailable - #723 by @AlicjaSzu
- Regenerate types - #712 by @dominik-zeglen

## 2.10.0

- Account confirmation mechanism - #565 by @tomaszszymanski129
- Add missing product attributes on product page - #536 by @orzechdev
- Change register mutation to accountRegister - #549 by @tomaszszymanski129
- Add `ProductVariantPicker` component supporting multiple product variant attributes - #550 by @orzechdev
- Fix not working storefront when no data in saleor database exist - #551 by @orzechdev
- Make checkout working without shipping if it is not required - #571 by @orzechdev
- Add ability to apply a promo code in checkout - #582 by @orzechdev
- Refactor product list - #591 by @orzechdev
- Add chips of selected filter attributes values and fix product list filtering - #602 by @orzechdev
- Refactor FilterAttribute to AttributeValuesChecklist - #610 by @orzechdev
- Clear cache on logout - #623 by @orzechdev
- Add missing Cypress functional tests - #624 by @mateuszkula
- Add lighthouse config - #627 by @mateuszkula
- Load Stripe asynchronously - #629 by @orzechdev
- Fix crash address book on logout - #630 by @orzechdev
- Preload css for Inter font - #631 by @orzechdev
- Use sdk for fetching shop details - #632 by @mateuszkula
- Preconnect to Graphql API_URI - #634 by @mateuszkula
- Upgrade typescript to 3.8.2 - #635 by @mateuszkula
- Remove linguijs usage - #637 by @mateuszkula
- Remove old storybook - #638 by @mateuszkula
- Add docs to storybook - #614 by @orzechdev
- Create new UI for product page - #605 by @mateuszkula
- Use new pricing on product page with TaxedMoney component to display prices - #584 by @orzechdev
- Update GraphQL schema - #567 by @orzechdev
- Completely recreate checkout and cart, with new checkout nad cart SDK - #639 by @orzechdev, @mateuszkula
- Hide payment options - #678 by @orzechdev
- Fix unhandled JWT token expiration - #696 by @orzechdev
- Regenerate types - #712 by @dominik-zeglen
- Replace stockQuantity field with quantityAvailable - #723 by @AlicjaSzu

## 0.7.0

- Fix login and registration overlay not showing - #322 by @mateuszkula
- Add new design for 404 page - #183 by @mateuszkula
- Add Sitemap generator - #342 by @bogdal
- Add Cypress tests - #333 by @AlicjaSzu
- Add rich-text content renderer - #361 by @AlicjaSzu
- Add rich-text content renderer for pages - #426 @ChanceLeachman
- Add TextField and ErrorMessage components - #373 by @AlicjaSzu
- Add CreditCardForm component - #369 by @AlicjaSzu
- Display filters when no product was found - #319 by @aldomonteiro
- Add ServiceWorker provider - #352 by @bogdal
- Add ButtonLink atom component - #392 by @AlicjaSzu
- Add `lingui` - #382 by @AlicjaSzu
- Add FormFooter molecule component - #393 by @AlicjaSzu
- Add Overlay component - #402 by @AlicjaSzu
- Add Modal component - #391 by @AlicjaSzu
- Add the Credential Management API support - #409 by @bogdal
- Add size picker component - #425 by @bogdal
- Replace `BACKEND_URL` in favor of `API_URI` - #474 by @bogdal
- Adapt `checkout.availablePaymentGateways` structure to the new schema - #483 by @bogdal
- Replace product/variant `price` fields with appropriate `pricing` fields - #483 by @bogdal
- Add Stripe integration - #486 by @bogdal
- Add `PlaceholderImage` component and show it in case of missing thumbnail - #489 by @xit4

## 0.6.0

- Fix items number in cart based on total sum of quantities - #286 by @bogdandjukic
- Add new styles for inputs and labels - #311 by @AlicjaSzu
- Create custom Select component and add it to ShippingAddress form - ##312 by @AlicjaSzu
- Add schema.org data to homepage and product detail page - #316 by @koradon
- Add link for creating account for anonymous users - #317 by @mateuszkula
- Add react-alert library = #320 by @AlicjaSzu
- CreditCard component refactor = #323 by @AlicjaSzu
- Move App component to seperate module = #327 by @AlicjaSzu
- Update Footer, Breadcrumbs and Table styles = #332 by @AlicjaSzu

## 0.5.1

- Fix image caching - #271 by @timuric
- Fix images cors - #288 by @piotrgrundas

## 0.5.0

- Add stock quantity check without checkout in cart page - #254 by @piotrgrundas
- Add ability to chose payment method, add dummy payment method, improve error handling on checkout shipping address update - #255 by @piotrgrundas
- Add order details page - #262 by @piotrgrundas
- Add order confirmation page - #263 by @piotrgrundas
- Fix checkout composition - #264 by @piotrgrundas
- Add ability to select user stored addresses, update copying shipping address to billing - #265 by @piotrgrundas
- Fix rendering order statuses and order line prices - #281 by @maarcingebala

## 0.4.0

- Handle quantity API errors in cart - #199 by @piotrgrundas
- Fix sticky footer, adjust cart overlay to the mockups, fix error if no shipping method found - #205 by @piotrgrundas
- Disable ability to continue to the billing step without shipement chosen - #211 by @piotrgrundas
- Set max width of images in product description as 100% - #220 by @jxltom
- Move checkout to a separate module, create checkout after user provides a valid email - #223 by @piotrgrundas
- Update checkout review page styles - #239 by @piotrgrundas
- Add syncing checkout after user logs in - #243 by @piotrgrundas
- Create checkout for logged in users without checkout upon adding to cart - #250 by @piotrgrundas

## 0.3.0

- Hide filters and sorting when there are no search results; add trending products to empty search and categories pages - #165 by @piotrgrundas
- Add fetching menus from API - #170 by @piotrgrundas
- Add "Add to cart" indicator - #173 by @piotrgrundas
- Fix product page tablet view - #181 by @piotrgrundas
- Add collection view, fix cursor pagination for categories, update storefront to use new thumbnail structure - #178 by @piotrgrundas
- Minor UX improvements - #182 by @piotrgrundas
- Fix product titles breaking the homepage carousel - #184 by @piotrgrundas
- Fix resolving URLs that include numbers - #185 by @piotrgrundas
- Add OpenGraph and Meta tags - #191 by @piotrgrundas
- Add `tslint` check on CI; add the ability to change cart quantity - #194 by @piotrgrundas
- Update placeholder for missing image - #198 by @piotrgrundas

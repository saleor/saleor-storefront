# Saleor Storefront

![1 copy 2x](https://user-images.githubusercontent.com/5421321/47798207-30aeea00-dd28-11e8-9398-3d8426836a83.png)

_**Note:** This project is beta quality. We don't advise using it in production._

A GraphQL-powered, PWA, single-page application storefront for [Saleor](https://github.com/mirumee/saleor/).

## Features

- Headless ecommerce storefront built with [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/client), [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Offline mode (beta)
- Saleor GraphQL API integration
- Single-page application experience
- [Braintree Payment Gateway](https://www.braintreepayments.com/) integration

## Demo

See the [public demo](http://pwa.saleor.io) of Saleor Storefront!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+
- A running instance of Saleor.

  To run the storefront, you have to set the `API_URI` environment variable to point to the Saleor GraphQL API. If you are running Saleor locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

### Installing

Clone the repository:

```
git clone https://github.com/mirumee/saleor-storefront.git
```

Enter the project directory:

```
cd saleor-storefront
```

#### Using stable release

To use the official stable release, checkout to a release tag:

```
$ git checkout 2.10.4
```

See the list of all releases here: https://github.com/mirumee/saleor-storefront/releases/

#### Using development version

If you want to use the latest development version, checkout to the `master` branch:

```
$ git checkout master
```

Install NPM dependencies:

```
npm i
```

Run the development server:

```
npm start
```

Go to `http://localhost:3000` to access the storefront.

## Cypress tests

If you want to run [Cypress](https://www.cypress.io/) tests, make sure that all dependecies (including `Cypress`) are installed by running the install command.

```
npm i
```

Following environment variables are required to be set in order to be able to run tests properly:

- `API_URI` - GraphQL API address.
- `CYPRESS_USER_NAME` - username (email) for `Storefront` user.
- `CYPRESS_USER_PASSWORD` - for the user mentioned above.

If you are runninng the Storefront from the perspective of `Docker` container, then you can run tests using following commands:

Headless mode:

```
cy:run
```

Cypress UI mode:

```
cy:open
```

If you want to run tests against your local development environment then use following commands:

Headless mode:

```
test:e2e:run
```

Cypress UI mode:

```
test:e2e:dev
```

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](https://github.com/mirumee/saleor-storefront/blob/master/LICENSE) file for details

#### Crafted with ❤️ by [Mirumee Software](http://mirumee.com)

hello@mirumee.com

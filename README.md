# Saleor Storefront

![1 copy 2x](https://user-images.githubusercontent.com/5421321/47798207-30aeea00-dd28-11e8-9398-3d8426836a83.png)

_**Note:** This project is beta quality. We don't advise using it in production._

A GraphQL-powered, PWA, single-page application storefront for [Saleor](https://github.com/mirumee/saleor/).

## Features

- Headless ecommerce storefront built with [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/client), [React](https://reactjs.org/), [Next.js](https://nextjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Offline mode (beta)
- Saleor GraphQL API integration
- Single-page application experience
- [Braintree Payment Gateway](https://www.braintreepayments.com/) integration

## Demo

See the [public demo](http://demo.saleor.io) of Saleor Storefront!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 12.0+. For managing node versions we advise using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).
- A running instance of [Saleor Core](https://github.com/mirumee/saleor).

### Environment variables

SPA is configured via environment variables. To learn more about this approach read [12factor app](https://12factor.net/config). Variables can be configured in [`.env.local` file](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) or by using [direnv](https://direnv.net/). Choose one which suits you better.

Available variables:
- `NEXT_PUBLIC_API_URI`: environment variable to point to the Saleor GraphQL API. By default it points to local environment: `http://localhost:8000/graphql/`.
- `NEXT_PUBLIC_APP_MOUNT_URI`: uri of your storefront. Default value: `/`.
- `SALEOR_CHANNEL_SLUG`: Channel which should be used by Storefront. Default value: `default-channel`.
- `CYPRESS_USER_NAME`: user name used by e2e tests.
- `CYPRESS_USER_PASSWORD`: user password used by e2e tests.
- `NEXT_PUBLIC_DEMO_MODE`: Used for our [public demo](http://demo.saleor.io). Default: `false`.

### Installing

Clone the repository:

```bash
git clone https://github.com/mirumee/saleor-storefront.git
```

Enter the project directory:

```bash
cd saleor-storefront
```

#### Using stable release

To use the official stable release, checkout to a release tag:

```bash
git checkout 2.11.0
```

See the list of all releases here: https://github.com/mirumee/saleor-storefront/releases/

#### Using development version

If you want to use the latest development version, checkout to the `master` branch:

```bash
git checkout master
```

When using current upstream, make sure to also run Saleor Core in the newest version.

### Starting dev server

Install NPM dependencies:

```bash
npm i
```

Run the development server:

```bash
npm start
```

Go to `http://localhost:3000` to access the storefront.

### Starting production build
On your production you should deploy SPA on service like [AWS S3 or Vercel](https://docs.saleor.io/docs/developer/running-saleor/docker#dashboard-and-storefront). Node server is not mandatory.

If you want to test production build locally compile the app :

```bash
npm run build
```

To compile the app and export storefront to the static HTML run:

```bash
npm run build:export
```

To run the app in production mode with next server run:

```bash
npm run start:production
```

Go to `http://localhost:3000` to access the storefront.

### Extending and contributions
#### Updating graphql types
After API changes gqlTypes needs to be updated. First, copy new version of `schema.graphql` file to the repository.
Building types needs to be run also on changes in graphql operations (fragments, queries, etc.):

```bash 
npm run build-types
```

#### Updating translations
To generate json files which can be later used in translation software:

```bash
npm run extract-messages
```

Command should be run after any change in messages visible to the user.

#### Code style and type checking
For code style we are using ESLint and Prettier. To apply formatting:

```bash
npm run lint
```

Type checking is handled by TSC:

```bash
npm run check-types
```

#### Storybook
[Storybook](https://storybook.js.org/) is a tool which helps with developing React Components, without need of running external API.

Start dev server:

```bash
npm run storybook
```

#### Jest tests

Our test suite uses storybook snapshots to track changes in rendered components. If your changes modify components, Jest will fail and ask for updating snapshots. It can be done using:

```bash
npm run test -- -u
```

#### Cypress tests

If you want to run [Cypress](https://www.cypress.io/) tests, make sure that all dependencies (including `Cypress`) are installed by running the install command.

```bash
npm i
```

Check section [Environment Variables](http://github.com/mirumee/saleor-storefront#environmentvariables) and make sure to pass proper values for Cypress user.

If you are running the Storefront from the perspective of Docker container, then you can run tests using following commands:

Headless mode:

```bash
npm run cy:run
```

Cypress UI mode:

```bash
npm run cy:open
```

If you want to run tests against your local development environment then use following commands:

If you want Cypress to also start SPA:

```bash
npm run test:e2e:dev
```

When you are running Saleor Core and Saleor Dashboard in separate process:

```bash
npm run test:e2e:run
```

#### Creating new components

All new components should follow Atomic Design Guidelines and be placed in `src/@next/components` directory.

Files structure can be generated using `plop`:

```
npm run generate
```

## Modifying the Storefront

[From Spectrum Post](https://spectrum.chat/saleor/saleor-storefront/modifying-the-storefront~c1955dbf-a421-4fb6-b99e-937dd2642b23)

### Important Files
**Modifying names, branding and display settings**:
- **config/next/config.base.js** - Base Next.js config file which contains webpack custom adjustments.
  - Can change name of the app (displayed when installed on mobile)
- **src/pages/_app.tsx** - Main entry point file. Render's the <App /> component, apollo-client, and others to the root div in index.html file above. Contains also head section - You can change the title of storefront here.
- **src/core/config.ts** - Controls number of products shown per page, support email, gateway providers, social media, and some meta.
  - Can change support email
  - Can change products shown per page
  - Can change gateway providers
  - Can change social media links that are displayed in the footer
  - Can change some meta options
- **src/images/** - Holds all the images for logo, cart, favicon, etc.
  - Can change storefront logo, favicon, or add new images here.

**Styles**:
- **src/globalStyles/scss/variables.scss** - Contains base styles like colors, font size, container width, media breakpoints and more.
- **src/@next/globalStyles/** - Contains more base styles, themes, media, and constants.

**Views and routing**:
- **src/views/** - This folder controls the views, or what is displayed for each page. Most views have a file named "Page.tsx" that controls the layout of the page and a file named "View.tsx" that calls the query and renders the <Page /> component with the data.
  - Can add another view to storefront here. Requires adding a route (see routes below).
- **src/@next/pages/** - Second spot for modifying/adding different pages. This is the recommended directory to add new pages.
- **src/paths.ts** - This folder contains all the paths. Here is where you add a new one.
- **src/pages/** - This folder contains files which are translated to [Next.js routing](https://nextjs.org/docs/basic-features/pages). Here is where you add a new route.
  1.  Export a new path in paths.ts
  2.  Inside pages, create a new file with name corenspond to your desired route ([read more here](https://nextjs.org/docs/routing/dynamic-routes) about nested routes). Import your view in the created route file end export it as a default export.
  3.  To link to your new view `import Link from "next/link"` and use new path you created in paths.ts (make sure to import it)
- **src/app/App.tsx** - This is main <App /> component that renders the <MainMenu />, <Routes /> (explained below), <Footer /> and a couple other components.

**Adding a Payment Gateway**:
- **src/core/config.ts** - Add new gateway provider name here.
- **src/@next/components/organisms/** - Create a new folder for new payment gateway component here.
- **src/@next/components/organisms/PaymentGatewaysList/PaymentGatewaysList.tsx** - Import new gateway component, create a new switch case to handle your gateway component.

### Receiving confirmation emails

- **Set [EMAIL_URL](https://docs.saleor.io/docs/developer/running-saleor/configuration#setting-environment-variables) environment variable for Saleor Core.**
  - Using Docker - Add EMAIL_URL as new environment variable to both the api and worker service following the format [here](https://docs.saleor.io/docs/developer/running-saleor/configuration#email_url).
- **Issues getting emails working?**
  - Gmail
    - Check to see that "Less secure app access" is turned ON. Under "Manage your Google Account" > Go to the security tab. By default, the setting is off for security reasons.
    - If using 2FA make sure to set an [app password](https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637355441414497566-1310044707&rd=1) and use that in place of your normal login password.
  - Emails in local environment are not send
    - If you are using saleor-platform, emails are captured by Mailhog. It's interface can be accessed at `http://localhost:8025`


## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](https://github.com/mirumee/saleor-storefront/blob/master/LICENSE) file for details

#### Crafted with ❤️ by [Mirumee Software](http://mirumee.com)

hello@mirumee.com

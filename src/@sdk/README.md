# Saleor API SDK

This package contains all queries and mutations that are used in our sample storefront. It can be used for semi-custom or fully-custom (with ability to extend existing queries) storefront solutions.

## Setup (PACKAGE CURRENTLY NOT RELEASED TO NPM)

```
npm install saleor-sdk
```

Create new saleor client by using our built-in pre-configured apollo client:

```
import { createSaleorClient } from 'saleor-sdk'

const client = createSaleorClient(API_URL)
```

## Usage

### React

We provide a custom hook per each query that have near identical API to `react-apollo` but are dynamically typed, with built-in error handling.

In your root file:

```
import { SaleorProvider } from 'saleor-sdk'
import { client } from './saleor'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <SaleorProvider client={client}>
    <App />
  </SaleorProvider>,
  rootElement
)
```

There are 2 types of api calls - queries and mutations.

Query (gets data):

```
const { data: TData["data"], loading: boolean, error: ApolloError } = useProductDetails(variables, options?)
```

Mutation (sets data):

```
const [
  signIn: (options?) => Promise<TData>,
  { data: TData["data"], loading: boolean, error: ApolloError, called: boolean }
] = useSignIn(options?)
```

For `options` and full api reference, navigate to [official docs](https://www.apollographql.com/docs/)

### Other frameworks

Create new SaleorAPI instance and use methods available on it

```
import { SaleorAPI } from 'saleor-sdk'
import { client } from './saleor'

export const saleorAPI = new SaleorAPI(client)
```

```
const { data } = await saleorAPI.getProductDetails(variables, options?)
```

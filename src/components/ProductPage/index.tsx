import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { Query } from "react-apollo";

import { GET_PRODUCT_DETAILS } from './queries'
import { getGraphqlIdFromDBId } from '../../core/utils'

import './scss/index.scss';


const ProductPage: React.SFC<RouteComponentProps<{id, slug}>> = ({match: {params: {id=''}}}) => (
  <Query query={GET_PRODUCT_DETAILS} variables={ {id: getGraphqlIdFromDBId(id, 'Product')} }>
    {({ loading, error, data: { product } }) => {
      if (loading) return 'Loading';
      if (error) return `Error!: ${error}`;
      return (
        <>
          <h2>{ product.name }</h2>
          <p>
            <img src={ product.thumbnailUrl } alt={ product.name } />
            { product.description }
          </p>
        </>
      )
    }}
  </Query>
)

export default ProductPage;
import './scss/index.scss';

import { get } from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Carousel, Loader, ProductListItem } from '..';
import { generateProductUrl } from '../../core/utils';
import { GET_FEATURED_PRODUCTS } from './queries';


interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.SFC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <Query
      query={GET_FEATURED_PRODUCTS}
      fetchPolicy="cache-first"
      errorPolicy="all"
    >
      {({ error, data, loading }) => {
        const products = get(data, 'shop.homepageCollection.products.edges');

        if (loading) {
          return <Loader />;
        }

        if (products && products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h3>{title}</h3>
                <Carousel>
                  {
                    products.map(({ node: product }) => (
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                      >
                        <ProductListItem product={product} />
                      </Link>
                    ))
                  }
                </Carousel>
              </div>
            </div>
          );
        }
        return null;
      }}
    </Query>
  );
};

ProductsFeatured.defaultProps = {
  title: 'Featured'
};

export default ProductsFeatured;

import Link from "next/link";
import * as React from "react";
import { generatePath } from "react-router";

import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { paths } from "@paths";

import { Carousel, ProductListItem } from "..";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title: string | undefined;
  products: FeaturedProduct[] | undefined;
}

export const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({
  title,
  products,
}) =>
  products?.length ? (
    <div className="products-featured">
      <div className="container">
        <h3>{title}</h3>
        <Carousel>
          {products.map(product => (
            <Link
              href={generatePath(paths.product, { slug: product.slug })}
              key={product.id}
            >
              <a>
                <ProductListItem product={product} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  ) : null;

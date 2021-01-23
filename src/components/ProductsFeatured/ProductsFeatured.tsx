import Link from "next/link";
import * as React from "react";

import { generateProductUrl } from "../../core/utils";
import { Carousel, ProductListItem } from "..";
import { FeaturedProduct } from "./gqlTypes/FeaturedProduct";

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
              href={generateProductUrl(product.id, product.name)}
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

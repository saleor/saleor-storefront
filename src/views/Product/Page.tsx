import { smallScreen } from "../../globalStyles/scss/variables.scss";

import classNames from "classnames";
import { isEmpty } from "lodash";
import { History } from "history";
import queryString from "query-string";
import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Media from "react-media";

import { Breadcrumbs, ProductDescription } from "../../components";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import GalleryCarousel from "./GalleryCarousel";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import OtherProducts from "./Other";

import { useProductVariantsAttributes } from "@hooks";
import { ICheckoutModelLine } from "@sdk/repository";
import { ProductDescription as NewProductDescription } from "../../@next/components/molecules";
import { ProductGallery } from "../../@next/components/organisms/";

import { structuredData } from "../../core/SEO/Product/structuredData";

const populateBreadcrumbs = product => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

const updateUrlWithAttributes = (history: History) => (
  slug: string,
  value: string
) => {
  history.replace(
    queryString.stringifyUrl(
      {
        url: `${history.location.pathname}${history.location.search}`,
        query: { [slug]: value },
      },
      { skipEmptyString: true }
    )
  );
};

const Page: React.FC<{
  product: ProductDetails_product;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
  searchVariants?: { [key: string]: string };
}> = ({ add, product, items, searchVariants }) => {
  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

  const history = useHistory();
  const [variantId, setVariantId] = React.useState("");

  const productVariantsAttributes = useProductVariantsAttributes(
    product.variants
  );

  const queryVariants = useMemo(() => {
    let queryVariants = {};
    if (!isEmpty(searchVariants)) {
      for (const key of Object.keys(productVariantsAttributes)) {
        const {
          attribute: { slug, id },
          values,
        } = productVariantsAttributes[key];
        for (const key of Object.keys(searchVariants)) {
          const item = searchVariants[key].toLowerCase();
          if (key.toLowerCase() === slug) {
            values.forEach(({ value }) => {
              if (typeof item === "string" && value.toLowerCase() === item) {
                queryVariants = { ...queryVariants, [id]: value };
              }
            });
          }
        }
      }
    }
    return queryVariants;
  }, [productVariantsAttributes]);

  useEffect(() => {
    if (!isEmpty(queryVariants)) {
      history.replace(history.location.pathname);
    }
  }, [queryVariants]);

  const getImages = () => {
    if (product.variants && variantId) {
      const variant = product.variants
        .filter(variant => variant.id === variantId)
        .pop();
      if (variant.images.length > 0) {
        return variant.images;
      } else {
        return product.images;
      }
    } else {
      return product.images;
    }
  };

  const productDescription = (
    <ProductDescription
      items={items}
      productId={product.id}
      name={product.name}
      productVariants={product.variants}
      pricing={product.pricing}
      queryVariants={queryVariants}
      addToCart={add}
      setVariantId={setVariantId}
      updateUrlWithAttributes={updateUrlWithAttributes(history)}
    />
  );

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
      </div>
      <div className="container">
        <div className="product-page__product">
          {/* Add script here */}
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>

          {/*  */}
          <Media query={{ maxWidth: smallScreen }}>
            {matches =>
              matches ? (
                <>
                  <GalleryCarousel images={getImages()} />
                  <div className="product-page__product__info">
                    {productDescription}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="product-page__product__gallery"
                    ref={productGallery}
                  >
                    <ProductGallery images={getImages()} />
                  </div>
                  <div className="product-page__product__info">
                    <div
                      className={classNames(
                        "product-page__product__info--fixed"
                      )}
                    >
                      {productDescription}
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      <div className="container">
        <div className="product-page__product__description">
          <NewProductDescription
            descriptionJson={product.descriptionJson}
            attributes={product.attributes}
          />
        </div>
      </div>
      <OtherProducts products={product.category.products.edges} />
    </div>
  );
};

export default Page;

const getVariantsStructuredData = variants => {
  return variants.map(variant => ({
    "@type": "Offer",
    itemCondition: "https://schema.org/NewCondition",
    price: variant.pricing.price.gross.amount.toFixed(2),
    priceCurrency: variant.pricing.price.gross.currency,
    sku: variant.sku,
  }));
};

export const structuredData = product => {
  const images = product.images.map(image => new URL(image.url).pathname);
  const { variants } = product;

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    description: !product.seoDescription
      ? `${product.description}`
      : `${product.seoDescription}`,
    image: images,
    name: !product.seoTitle ? `${product.name}` : `${product.seoTitle}`,
    offers: getVariantsStructuredData(variants),
    url: location.href,
  });
};

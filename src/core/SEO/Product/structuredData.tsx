const getVariantsStructuredData = variants => {
  const inStock = "https://schema.org/InStock";
  const outOfStock = "https://schema.org/OutOfStock";
  return variants.map(variant => ({
    "@type": "Offer",
    availability: variant.isAvailable ? inStock : outOfStock,
    itemCondition: "https://schema.org/NewCondition",
    price: variant.pricing.price.gross.amount.toFixed(2),
    priceCurrency: variant.pricing.price.gross.currency,
    sku: variant.sku,
  }));
};

export const structuredData = product => {
  const images = product.images.map(image => new URL(image.url).pathname);
  const variants = product.variants;

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    description: product.translation?.seoDescription 
      || product.translation?.description 
      || product.seoDescription 
      || product.description,
    image: images,
    name: product.translation?.seoTitle 
      || product.translation?.name 
      || product.seoTitle 
      || product.name,
    offers: getVariantsStructuredData(variants),
    url: location.href,
  });
};

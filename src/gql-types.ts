

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductsList_products_edges_node_price {
  amount: number;  // Amount of money.
}

export interface ProductsList_products_edges_node {
  id: string;                                            // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                           // The URL of a main thumbnail for a product.
  category: ProductsList_products_edges_node_category;
  price: ProductsList_products_edges_node_price | null;  // The product's base price (without any discounts         applied).
}

export interface ProductsList_products_edges {
  node: ProductsList_products_edges_node;  // The item at the end of the edge
}

export interface ProductsList_products {
  edges: ProductsList_products_edges[];
}

export interface ProductsList_categories_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductsList_categories_edges {
  node: ProductsList_categories_edges_node;  // The item at the end of the edge
}

export interface ProductsList_categories {
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  products: ProductsList_products | null;      // List of the shop's products.
  categories: ProductsList_categories | null;  // List of the shop's categories.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product {
  id: string;                   // The ID of the object.
  name: string;
  description: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

export interface ProductDetails {
  product: ProductDetails_product | null;  // Lookup a product by ID.
}

export interface ProductDetailsVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
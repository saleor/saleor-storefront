import { ProductPage, ProductPageProps } from "../../../views/Product";

export default ProductPage;

ProductPage.getInitialProps = async ({ query }) =>
  ({ query } as ProductPageProps);

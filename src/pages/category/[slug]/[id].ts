import { CategoryPage, CategoryPageProps } from "@temp/views/Category";

export default CategoryPage;

CategoryPage.getInitialProps = async ({ query }) =>
  ({ query } as CategoryPageProps);

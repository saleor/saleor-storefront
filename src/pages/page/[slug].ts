import { ArticlePage, ArticlePageProps } from "@temp/views/Article";

export default ArticlePage;

ArticlePage.getInitialProps = async ({ query }) =>
  ({ query } as ArticlePageProps);

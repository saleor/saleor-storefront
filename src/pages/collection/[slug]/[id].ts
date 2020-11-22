import { CollectionPage, CollectionPageProps } from "@temp/views/Collection";

export default CollectionPage;

CollectionPage.getInitialProps = async ({ query }) =>
  ({ query } as CollectionPageProps);

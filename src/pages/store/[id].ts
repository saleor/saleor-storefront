import { StorePage, StorePageProps } from "@temp/views/Store";

export default StorePage;
StorePage.getInitialProps = async ({ query }) => ({ query } as StorePageProps);

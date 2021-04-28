import { StorePage, StorePageProps } from "@temp/views/StorePage";

export default StorePage;
StorePage.getInitialProps = async ({ query }) => ({ query } as StorePageProps);

import { ThankYouPage, ThankYouPageProps } from "@pages";

export default ThankYouPage;

ThankYouPage.getInitialProps = async ({ query }) =>
  ({ query } as ThankYouPageProps);

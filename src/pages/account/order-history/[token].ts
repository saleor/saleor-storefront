import { OrderDetails, OrderDetailsProps } from "@temp/userAccount/views";

export default OrderDetails;

OrderDetails.getInitialProps = async ({ query }) =>
  ({ query } as OrderDetailsProps);

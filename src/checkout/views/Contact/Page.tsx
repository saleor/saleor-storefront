import * as React from "react";
import styled from 'styled-components';
import { ContactForm } from "../../../components";
import { Stepper } from "@temp/checkout/components/Stepper";

interface IProps {
  checkoutId: string;
  checkout: any;
}

const Page: React.FC<IProps> = props => {
  return <div>
    <CheckoutTitle>Contact Information</CheckoutTitle>
    <Stepper activeStep={0} />
    <ContactForm />
  </div>;
};

const CheckoutTitle = styled.h1`
  color: #af9a50;
  font-size: 1.5rem;
  margin: 2rem 0;
`;

export default Page;
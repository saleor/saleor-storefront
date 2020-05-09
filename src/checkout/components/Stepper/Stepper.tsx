import * as React from "react";
import styled from 'styled-components';
import Stepper from 'react-stepper-horizontal';

interface ICheckoutStepper {
  activeStep: number;
}

export default function CheckoutStepper({
  activeStep,
}, ICheckoutStepper) {
  const steps = [
    {title: 'CONTACT'},
    {title: 'SHIPPING'},
    {title: 'PAYMENT'},
    {title: 'CONFIRMATION'},
  ]

  return <Div>
    <Stepper
      steps={steps}
      activeStep={activeStep}
      size={10}
      circleFontSize={0}
      activeColor="#af9a50"
      defaultColor="#808080"
      completeColor="#808080"
      titleFontSize={9}
      defaultTitleColor="#808080"
    />
  </Div>;
};

const Div = styled.div`
  margin-bottom: 4rem;
`;

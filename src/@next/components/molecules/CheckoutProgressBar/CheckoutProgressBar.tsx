import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps, IStep } from "./types";

const activeDot = (
  <S.ActiveDot>
    <S.Dot done={true} />
  </S.ActiveDot>
);

const doneDot = <S.Dot done={true} />;

const inactiveDot = <S.Dot />;

const generateDot = (stepIndex: number, currentActiveStep: number) => {
  if (stepIndex < currentActiveStep) {
    return doneDot;
  }
  if (stepIndex === currentActiveStep) {
    return activeDot;
  }
  if (stepIndex > currentActiveStep) {
    return inactiveDot;
  }
};

const generateLabel = (
  stepIndex: number,
  name: string,
  numberOfSteps: number
) => {
  if (stepIndex === 0) {
    return <S.LeftLabel>{name}</S.LeftLabel>;
  }
  if (stepIndex === numberOfSteps - 1) {
    return <S.RightLabel>{name}</S.RightLabel>;
  }
  return <S.Label>{name}</S.Label>;
};

const generateProgressBar = (
  index: number,
  currentActive: number,
  numberOfSteps: number
) => {
  if (index !== numberOfSteps - 1) {
    return <S.ProgressBar done={currentActive > index} />;
  }
};

const generateSteps = (steps: IStep[], currentActive: number) => {
  return steps?.map(step => {
    return (
      <S.Step key={step.index}>
        <Link to={step.link}>
          {generateDot(step.index, currentActive)}
          {generateLabel(step.index, step.name, steps.length)}
        </Link>
        {generateProgressBar(step.index, currentActive, steps.length)}
      </S.Step>
    );
  });
};

/**
 * Progress bar showing current step of checkout process.
 */
const CheckoutProgressBar: React.FC<IProps> = ({
  steps,
  activeStep,
}: IProps) => {
  return <S.Wrapper>{generateSteps(steps, activeStep)}</S.Wrapper>;
};

export { CheckoutProgressBar };

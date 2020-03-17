export interface IStep {
  link: string;
  name: string;
}
export interface IProps {
  steps: IStep[];
  activeStep: number;
}

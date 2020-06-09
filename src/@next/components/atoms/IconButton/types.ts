import { IIconProps } from "../Icon";

export interface IProps extends IIconProps {
  onClick?: () => void;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}

export interface IProps {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
  onClick?: () => void;
}

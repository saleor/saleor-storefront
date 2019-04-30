export interface ISelectItem {
  [key: string]: {
    label: string;
    value: string;
  };
}

export interface ISelectProps {
  clickedOutside: boolean;
  label?: string;
  value: string;
  list: ISelectItem;
  name: string;
  setElementRef: (
    el: React.RefObject<HTMLElement>
  ) => React.RefObject<HTMLDivElement>;
  setFieldValue?(field: string, value: string | number): void;
}

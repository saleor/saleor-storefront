export interface ISelectItem {
  label: string;
  value: string;
}

export interface ISelectProps {
  clickedOutside?: boolean;
  defaultValue?: ISelectItem;
  label?: string;
  onChange?: (event: any) => void;
  options: ISelectItem[];
  name: string;
  setElementRef?: (
    el: React.RefObject<HTMLElement>
  ) => React.RefObject<HTMLDivElement>;
  setFieldValue?(field: string, value: string | number): void;
}

export interface IListArgs {
  options: ISelectItem[];
  onChange: (value: { country: string; code: string }) => void;
}

export interface IFilteredListArgs {
  options: ISelectItem[];
  searchPhrase: string;
}

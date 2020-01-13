import { ISelectOption } from "@types";

export interface IProps {
  title: React.ReactNode;
  options: ISelectOption[];
  selectedOptions?: string[];
  disabledOptions?: string[];
  hide: () => void;
  onSelect: (value: string) => void;
  show: boolean;
  target?: HTMLElement | null;
  footerTitle?: string;
  onClickFooter?: () => void;
}

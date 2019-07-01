export interface IProps {
  target?: HTMLElement | null;
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  children: React.ReactElement;
  submitBtnText?: string;
  loading: boolean;
  formId?: string;
  show: boolean;
}

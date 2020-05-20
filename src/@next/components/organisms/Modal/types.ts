export interface IProps {
  target?: HTMLElement | null;
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  children: React.ReactNode;
  submitBtnText: string;
  submitButtonDataCy: string;
  disabled: boolean;
  formId?: string;
  show: boolean;
  onSubmit?: () => void;
}

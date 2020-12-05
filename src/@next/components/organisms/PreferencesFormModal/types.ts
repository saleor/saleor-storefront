export interface IProps {
  hideModal: () => void;
  submitBtnText: string;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
}

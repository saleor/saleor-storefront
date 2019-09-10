import { IAddress } from "@types";

export interface IProps {
  hideModal: () => void;
  submitBtnText: string;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
  userId?: string;
  address?: {
    address: IAddress;
    id: string;
  };
}

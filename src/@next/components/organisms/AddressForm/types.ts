import { IAddress } from "@types";

export interface IProps {
  handleSubmit: (formData: IAddress) => void;
  address?: Partial<IAddress>;
}

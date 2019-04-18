import { Omit } from "../../core/tsUtils";
import { AddressInterface } from "../../core/types";
import { FormError } from "../Form";

export interface AddressType extends Partial<AddressInterface> {
  email?: string;
}

export interface FormAddressType extends Omit<AddressType, "country"> {
  asBilling?: boolean;
  asNew?: boolean;
  country: { value?: string; code?: string };
}

export interface IShippingAddressFormProps {
  buttonText: string;
  billing?: boolean;
  data?: AddressType;
  errors: FormError[];
  loading: boolean;
  onSubmit: (event: React.FormEvent<any>, data: FormAddressType) => void;
}

export interface IShippingNewAddressFormProps
  extends IShippingAddressFormProps {
  email: string;
  secondaryButtonText: string;
}

import { Omit } from "../../core/tsUtils";
import { AddressInterface } from "../../core/types";
import { FormError } from "../Form";

export interface AddressType extends Partial<AddressInterface> {
  email?: string;
}

export interface FormAddressType extends Omit<AddressType, "country"> {
  asBilling?: boolean;
  asNew?: boolean;
  country: { country?: string; code?: string; value?: string };
}

interface IBaseShippingAddressFormProps {
  billing?: boolean;
  data?: AddressType;
  errors: FormError[];
  loading: boolean;
}
export interface IShippingAddressFormProps
  extends IBaseShippingAddressFormProps {
  buttonText: string;
  onSubmit: (data: FormAddressType) => void;
}

export interface IShippingNewAddressFormProps
  extends IBaseShippingAddressFormProps {
  onSubmit: (data: FormAddressType) => void;
}

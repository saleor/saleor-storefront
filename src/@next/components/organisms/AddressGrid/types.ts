declare type Address = {
  onEdit: () => void;
  onRemove: () => void;
  setDefault: () => void;
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
  address: {
    firstName: string;
    lastName: string;
    companyName: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    postalCode: string;
    countryArea: string;
    phone: string;
    country: string;
  };
};
export interface IProps {
  addresses: Address[];
}

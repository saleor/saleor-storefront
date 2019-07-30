export interface IProps {
  onEdit: () => void;
  onRemove: () => void;
  setDefault: (arg0: string) => void;
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
    isDefaultShippingAddress: boolean;
    isDefaultBillingAddress: boolean;
  };
}

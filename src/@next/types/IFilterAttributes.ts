export interface IFilterAttributeValue {
  id: string;
  name: string;
  slug: string;
  selected?: boolean;
}

export interface IFilterAttributes {
  id: string;
  name: string;
  slug: string;
  values: IFilterAttributeValue[];
}

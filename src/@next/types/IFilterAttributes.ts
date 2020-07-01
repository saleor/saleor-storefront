export interface ISingleFilterAttribute {
  id: string;
  name: string;
  slug: string;
  selected?: boolean;
  translation: ISingleFilterAttributeTranslation;
}
export interface ISingleFilterAttributeTranslation {
  name: string;
}


export interface IFilterAttributes {
  id: string;
  name: string;
  slug: string;
  values: ISingleFilterAttribute[];
  translation: IFilterAttributeTranslation;
}
export interface IFilterAttributeTranslation {
  name: string;
}


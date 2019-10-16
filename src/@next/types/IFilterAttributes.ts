export interface ISingleFilterAttribute {
  id: string;
  name: string;
  slug: string;
}
export interface IFilterAttributes {
  id: string;
  name: string;
  slug: string;
  values: ISingleFilterAttribute[];
}

import { Attribute, Attribute_values } from "@graphql/gqlTypes/Attribute";
import { NonNullableType } from "@utils/tsUtils";

export type IFilterAttribute = {
  selected?: boolean;
} & NonNullableType<Attribute_values>;

export type IFilterAttributes = {
  values: IFilterAttribute[];
} & NonNullableType<Attribute>;

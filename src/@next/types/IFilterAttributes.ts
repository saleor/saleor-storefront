import { Attribute, Attribute_values } from "@graphql/gqlTypes/Attribute";
import { NonNullableType } from "@utils/tsUtils";

export type FilterAttribute = {
  selected?: boolean;
} & NonNullableType<Attribute_values>;

export type FilterAttributes = {
  values: FilterAttribute[];
} & NonNullableType<Attribute>;

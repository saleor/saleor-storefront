import { Omit } from "../core/tsUtils";
import { Address } from "./types/Address";

export type AddressType = Partial<
  Omit<Address, "__typename" | "id" | "country">
> & {
  country: string;
};

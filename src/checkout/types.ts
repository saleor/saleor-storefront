import { Omit } from "../core/tsUtils";
import { Address } from "./types/Address";

export type AddressType = Omit<Address, "__typename" | "id">;

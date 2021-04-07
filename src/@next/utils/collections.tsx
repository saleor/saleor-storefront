import React from "react";
import { FormattedMessage } from "react-intl";

import { prodListHeaderCommonMsg } from "@temp/intl";
import { UknownObject } from "@utils/tsUtils";

export type SortOptions = {
  label: string | JSX.Element;
  value: string | null;
}[];

export const SORT_OPTIONS: SortOptions = [
  {
    label: <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsClear} />,
    value: null,
  },
  {
    label: <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsPrice} />,
    value: "price",
  },
  {
    label: (
      <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsPriceDsc} />
    ),
    value: "-price",
  },
  {
    label: <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsName} />,
    value: "name",
  },
  {
    label: <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsNameDsc} />,
    value: "-name",
  },
  {
    label: (
      <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsUpdatedAt} />
    ),
    value: "updated_at",
  },
  {
    label: (
      <FormattedMessage {...prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc} />
    ),
    value: "-updated_at",
  },
];

export const FilterQuerySet = {
  encode(valueObj: UknownObject<string[]>) {
    const str: string[] = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue: string) {
    const obj: UknownObject<string[]> = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

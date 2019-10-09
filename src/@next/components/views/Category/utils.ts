export const FilterParam = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".");
    propsWithValues.map(value => {
      const propWithValues = value.split("_");
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const convertFiltersToAttributeScalar = filters => {
  if (filters) {
    return Object.keys(filters)
      .map(key => {
        return filters[key].map(item => ({ slug: key, value: item }));
      })
      .flat();
  } else {
    return [];
  }
};

export const sortOptions = [
  {
    label: "Clear...",
    value: null,
  },
  {
    label: "Price Low-High",
    value: "price",
  },
  {
    label: "Price High-Low",
    value: "-price",
  },
  {
    label: "Name Increasing",
    value: "name",
  },
  {
    label: "Name Decreasing",
    value: "-name",
  },
  {
    label: "Last updated Ascending",
    value: "updated_at",
  },
  {
    label: "Last updated Descending",
    value: "-updated_at",
  },
];

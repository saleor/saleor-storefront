import { KeysMatching } from "./tsHelpers";

// errors are nested in data as it currently stands in the API
// this helper extracts all errors present
export const getErrorsFromData = data => {
  try {
    const error = Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        ...(data[key].errors &&
          !!data[key].errors.length && { userInputErrors: data[key].errors }),
      };
    }, {});

    return !!Object.keys(error).length ? error : null;
  } catch (e) {
    return null;
  }
};

export const isDataEmpty = data =>
  Object.keys(data).reduce((_, key) => !!data[key], true);

type Flatten = <T>(data: T) => KeysMatching<T, { [key: string]: any }>;

export const flatten: Flatten = data =>
  Object.keys(data).reduce(
    (acc, key) => ({
      ...acc,
      ...data[key],
    }),
    {}
  );

const obj = { data: { id: 123, name: "wew" } };

const data = flatten<typeof obj>(obj);

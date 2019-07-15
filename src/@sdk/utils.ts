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

export const getNestedData = <T extends { [key: string]: any }>(data: T) =>
  Object.keys(data).reduce(
    (acc, key) => ({
      ...acc,
      ...data[key],
    }),
    {}
  );

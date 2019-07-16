export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

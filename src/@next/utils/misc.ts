export function maybe<T>(exp: () => T): T | undefined;
export function maybe<T>(exp: () => T, d: T): T;
export function maybe(exp: any, d?: any) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function filterNotEmptyArrayItems<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function getJsonFromUrl(
  url: string
): { [key: string]: string | Array<string> } | undefined {
  if (!url) url = location.href;

  const question = url.indexOf("?");
  let hash = url.indexOf("#");

  if (hash === -1 && question === -1) return {};
  if (hash === -1) hash = url.length;

  const query =
    question === -1 || hash === question + 1
      ? url.substring(hash)
      : url.substring(question + 1, hash);

  // @ts-ignore
  const result: { [key: string]: string | Array } = {};

  query.split("&").forEach(function (part) {
    if (!part) return;
    part = part.split("+").join(" "); // replace every + with space, regexp-free version
    const eq = part.indexOf("=");
    let key = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
    const from = key.indexOf("[");
    if (from === -1) result[decodeURIComponent(key)] = val;
    else {
      const to = key.indexOf("]", from);
      const index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}

export const storage = {
  get: (key: string): string | null => localStorage.getItem(key),
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  clear: (): void => localStorage.clear(),
  remove: (...keys: string[]): void =>
    keys.forEach((key) => localStorage.removeItem(key)),
};

export const getCookieValue = async (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  } else {
    throw new Error("--something went wrong---");
  }
};

export const extractCookieByName = (cookies: string, name: string) => {
  const cookiesArr = cookies.split("; ");
  const result = cookiesArr.find((el) => el.split("=")[0] === name);
  return result && result.split("=")[1];
};

// export const storage = () => {
//   if (typeof window !== "undefined") {
//     const get = (key: string): string => localStorage.getItem(key) || '';
//     const set = (key: string, value: string): void =>
//       localStorage.setItem(key, value);
//     const clear = (): void => localStorage.clear();
//     const remove = (...keys: string[]): void =>
//       keys.forEach((key) => localStorage.removeItem(key));
//     return { get, set, clear, remove };
//   }
// };

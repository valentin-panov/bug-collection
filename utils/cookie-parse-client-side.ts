export const getClientCSRF = (): string => {
  if (document) {
    const csrfCookie = /X-XSRF-TOKEN=(?<csrf>[^;]*)/g.exec(document.cookie);
    return csrfCookie?.groups?.csrf || "";
  }
  return "";
};

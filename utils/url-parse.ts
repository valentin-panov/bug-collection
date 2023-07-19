import { sanitizeUrl } from "@braintree/sanitize-url";

export function decodeURL(url: string): string {
  // &#340; => Ŕ
  return url.replace(/(&#(\d+);)/g, (_match, _capture, charCode) =>
    String.fromCharCode(charCode)
  );
}

export const URL_REGEXP =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
export const isForeignURL = (url: string): boolean => {
  // Checking for special non-standard URL formats, but valid anchor href formats, like phone numbers (tel:+123456789), mails (mailto:name@example.com), relative paths (/relative-path), ids (#element-id) or query (?query=value)
  if (!URL_REGEXP.test(url)) {
    return false;
  }
  try {
    const { hostname, protocol } = new URL(url);
    return protocol !== "https:" || !hostname.endsWith("google.com");
  } catch {
    return true;
  }
};

export function decodeURLnew(url: string): string {
  const sanitized = sanitizeUrl(url);

  return isForeignURL(sanitized) ? "about:blank" : sanitized;
}

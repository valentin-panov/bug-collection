// eslint-disable-next-line no-restricted-imports
import sanitizeHtmlLib from "sanitize-html";

import { getSafeHref } from "./getSafeHref";

import {
  XSS_HTML_ATTRIBUTE_WHITELIST,
  XSS_HTML_TAG_WHITELIST,
} from "./constants";

const newSanitizeHtml = (html?: string | null | number | boolean): string => {
  if (!html || typeof html === "number" || typeof html === "boolean") return "";

  return sanitizeHtmlLib(html, {
    allowedAttributes: {
      a: XSS_HTML_ATTRIBUTE_WHITELIST.A,
      img: XSS_HTML_ATTRIBUTE_WHITELIST.IMG,
      svg: XSS_HTML_ATTRIBUTE_WHITELIST.SVG,
      "*": XSS_HTML_ATTRIBUTE_WHITELIST.SAFE_ATTRIBUTES_FOR_ALL_TAGS,
    },
    allowedTags: XSS_HTML_TAG_WHITELIST,
    // sanitize-html lib itself supports this attribute, however @types/sanitize-html doesn't
    // eslint-disable-next-line
    // @ts-ignore
    nonBooleanAttributes: sanitizeHtmlLib.defaults.nonBooleanAttributes.filter(
      (e: string) => e !== "alt",
    ),
    parseStyleAttributes: false,
    allowVulnerableTags: true,

    // transformTags used here to sanitize a tag href attributes, to prevent malicious actors from redirecting users.
    transformTags: {
      a: (tagName, attribs) => {
        const sanitizedHref = getSafeHref(attribs.href);
        return {
          tagName,
          attribs: {
            ...attribs,
            href: sanitizedHref,
          },
        };
      },
    },
  });
};

export { newSanitizeHtml };

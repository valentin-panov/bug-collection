import { getSanitizeUrl } from './sanitizeUrl';
import isLocalEnv from './isLocalEnv';
import {
    EMPTY_VALUE,
    TEL_SCHEME,
    ALLOWED_DOMAINS,
    ALLOWED_SCHEMA,
} from './constants';

const getSafeHref = (href: string | undefined) => {
    const sanitizedHref = getSanitizeUrl(href);

    if (!sanitizedHref) return EMPTY_VALUE;

    const isQueryString = sanitizedHref.startsWith('?');
    const isRelativeHref = sanitizedHref.startsWith('/');
    const isTelephoneHref = sanitizedHref.startsWith(TEL_SCHEME);
    const isHttps = sanitizedHref.startsWith(ALLOWED_SCHEMA);
    const containsAllowedDomain = ALLOWED_DOMAINS.some((domain) =>
        sanitizedHref.includes(domain)
    );

    const isValidSource = isLocalEnv()
        ? containsAllowedDomain
        : isHttps && containsAllowedDomain;

    if (isRelativeHref || isTelephoneHref || isValidSource || isQueryString)
        return sanitizedHref;

    return EMPTY_VALUE;
};

export { getSafeHref };

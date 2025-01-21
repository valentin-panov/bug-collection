import { sanitizeUrl } from '@braintree/sanitize-url';

import isLocalEnv from './isLocalEnv';

import { ALLOWED_DOMAINS } from './constants';

const getSanitizeUrl = (url?: string): string | undefined => {
    if (!url) return undefined;

    if (url.startsWith('//')) {
        const subPath = url.split('//')[1];
        const { host } = new URL(`http${isLocalEnv() ? '' : 's'}:${subPath}`);
        if (!ALLOWED_DOMAINS.includes(host)) return undefined;
    }

    const sanitizedUrl = sanitizeUrl(url);
    return sanitizedUrl === 'about:blank' ? undefined : sanitizedUrl;
};

export { getSanitizeUrl };

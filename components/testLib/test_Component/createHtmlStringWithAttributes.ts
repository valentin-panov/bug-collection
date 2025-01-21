export const createHTMLStringWithAttributes = (
    htmlTags: string | string[],
    htmlAttributes: string | string[] | undefined = undefined
): string => {
    let attributesArray: string[] = [];
    if (htmlAttributes) {
        attributesArray = Array.isArray(htmlAttributes)
            ? htmlAttributes
            : [htmlAttributes];
    }

    const tagsArray: string[] = Array.isArray(htmlTags) ? htmlTags : [htmlTags];

    const selfClosingTags = new Set([
        'area',
        'base',
        'br',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
    ]);

    const hasAttributes = attributesArray.length > 0;

    let htmlString = '';

    tagsArray.forEach((tag) => {
        htmlString += `<${tag}`;

        if (hasAttributes) {
            attributesArray.forEach((attr) => {
                if (attr) {
                    htmlString += ` ${attr}="unsafe value"`;
                }
            });
        }

        if (selfClosingTags.has(tag)) {
            htmlString += ` />`;
        } else {
            htmlString += `></${tag}>`;
        }
    });

    return htmlString;
};

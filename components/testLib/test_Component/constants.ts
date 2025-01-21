const UNSAFE_HTML_TAGS = [
    'area',
    'base',
    'basefont',
    'bgsound',
    'blink',
    'embed',
    'frameset',
    'iframe',
    'isindex',
    'keygen',
    'link',
    'meta',
    'object',
    'param',
    'plaintext',
    'script',
    'source',
    'textarea',
    'title',
    'noscript',
];

const UNSAFE_EVENT_HANDLER_ATTRIBUTES = [
    'onabort',
    'onactivate',
    'onafterprint',
    'onbeforeprint',
    'onbegin',
    'onblur',
    'oncancel',
    'oncanplay',
    'oncanplaythrough',
    'onchange',
    'onclick',
    'onclose',
    'oncontextmenu',
    'oncopy',
    'oncuechange',
    'oncut',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragexit',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onend',
    'onended',
    'onerror',
    'onfocus',
    'onfocusin',
    'onfocusout',
    'onfullscreenchange',
    'onfullscreenerror',
    'ongotpointercapture',
    'onhashchange',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onloadeddata',
    'onloadedmetadata',
    'onloadstart',
    'onlostpointercapture',
    'onmessage',
    'onmousedown',
    'onmouseenter',
    'onmouseleave',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onpause',
    'onplay',
    'onplaying',
    'onpointercancel',
    'onpointerdown',
    'onpointerenter',
    'onpointerleave',
    'onpointermove',
    'onpointerout',
    'onpointerover',
    'onpointerup',
    'onprogress',
    'onratechange',
    'onreset',
    'onresize',
    'onscroll',
    'onseeked',
    'onseeking',
    'onselect',
    'onselectionchange',
    'onselectstart',
    'onshow',
    'onstalled',
    'onsubmit',
    'onsuspend',
    'ontimeupdate',
    'ontoggle',
    'onvolumechange',
    'onwaiting',
    'onwheel',
    'onbeforeunload',
    'onbeforexrselect',
    'onpointerrawupdate',
    'onsecuritypolicyviolation',
    'ontransitioncancel',
    'ontransitionend',
    'ontransitionrun',
    'ontransitionstart',
    'onwebkitanimationend',
    'onwebkitanimationiteration',
    'onwebkitanimationstart',
    'onwebkittransitionend',
];

export const XSS_VULNERABLE_HTML = {
    UNSAFE_HTML_TAGS,
    UNSAFE_EVENT_HANDLER_ATTRIBUTES,
};

const SAFE_ATTRIBUTES_FOR_ALL_TAGS = ['style', 'class'];

const SAFE_A_TAG_ATTRIBUTES = ['href', 'name', 'target', 'rel'];

const SAFE_IMG_TAG_ATTRIBUTES = ['alt', 'title', 'width', 'height'];

const SAFE_SVG_TAG_ATTRIBUTES = [
    'accent-height',
    'alignment-baseline',
    'ascent',
    'attributename',
    'attributetype',
    'azimuth',
    'basefrequency',
    'baseline-shift',
    'begin',
    'bias',
    'by',
    'class',
    'clip',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'cx',
    'cy',
    'd',
    'dx',
    'dy',
    'diffuseconstant',
    'direction',
    'display',
    'divisor',
    'dur',
    'elevation',
    'end',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'filterunits',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyph-name',
    'glyphref',
    'gradientunits',
    'gradienttransform',
    'height',
    'href',
    'id',
    'image-rendering',
    'img',
    'in',
    'in2',
    'intercept',
    'k1',
    'k2',
    'k3',
    'k4',
    'kerning',
    'keypoints',
    'keysplines',
    'keytimes',
    'lang',
    'lengthadjust',
    'letter-spacing',
    'lighting-color',
    'limitingconeangle',
    'local',
    'marker-end',
    'marker-mid',
    'marker-start',
    'markerheight',
    'markerunits',
    'markerwidth',
    'mask',
    'maskcontentunits',
    'maskunits',
    'mathematical',
    'max',
    'media',
    'method',
    'mode',
    'name',
    'numoctaves',
    'offset',
    'opacity',
    'operator',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'overline-position',
    'overline-thickness',
    'panose-1',
    'path',
    'pathlength',
    'patterncontentunits',
    'patterntransform',
    'patternunits',
    'pointer-events',
    'points',
    'pointsatx',
    'pointsaty',
    'pointsatz',
    'preservealpha',
    'preserveaspectratio',
    'primitiveunits',
    'r',
    'radius',
    'refx',
    'refy',
    'repeatcount',
    'repeatdur',
    'requiredextensions',
    'requiredfeatures',
    'restart',
    'result',
    'rotate',
    'rx',
    'ry',
    'scale',
    'seed',
    'shape-rendering',
    'slope',
    'spacing',
    'specularconstant',
    'specularexponent',
    'speed',
    'spreadmethod',
    'startoffset',
    'stddeviation',
    'stemh',
    'stemv',
    'stitchtiles',
    'stop-color',
    'stop-opacity',
    'strikethrough-position',
    'strikethrough-thickness',
    'string',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'style',
    'systemlanguage',
    'tabindex',
    'target',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'transform',
    'type',
    'u1',
    'u2',
    'underline-position',
    'underline-thickness',
    'unicode',
    'values',
    'version',
    'viewbox',
    'visibility',
    'width',
    'word-spacing',
    'writing-mode',
    'x',
    'x-height',
    'x1',
    'x2',
    'xchannelselector',
    'xlink:href',
    'xmlns',
    'y',
    'y1',
    'y2',
    'ychannelselector',
    'z',
    'zoomandpan',
];

export const XSS_HTML_ATTRIBUTE_WHITELIST = {
    A: SAFE_A_TAG_ATTRIBUTES,
    IMG: SAFE_IMG_TAG_ATTRIBUTES,
    SVG: SAFE_SVG_TAG_ATTRIBUTES,
    SAFE_ATTRIBUTES_FOR_ALL_TAGS,
};

export const XSS_HTML_TAG_WHITELIST = [
    'address',
    'article',
    'aside',
    'footer',
    'header',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hgroup',
    'main',
    'nav',
    'section',
    'blockquote',
    'dd',
    'div',
    'dl',
    'dt',
    'figcaption',
    'figure',
    'hr',
    'li',
    'main',
    'ol',
    'p',
    'pre',
    'ul',
    'a',
    'abbr',
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'code',
    'data',
    'dfn',
    'em',
    'i',
    'img',
    'kbd',
    'mark',
    'q',
    'rb',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'style',
    'sub',
    'sup',
    'svg',
    'time',
    'u',
    'var',
    'wbr',
    'caption',
    'col',
    'colgroup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
];

export const EMPTY_VALUE = '';
export const TEL_SCHEME = 'tel:';
export const ALLOWED_SCHEMA = 'https://';
export const ALLOWED_DOMAINS = ['ee.co.uk', 'bt.canto.global'];

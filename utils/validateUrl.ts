export const validateUrlSimple = (url: string): string => {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol)
      ? parsed.toString()
      : "";
  } catch {
    return "";
  }
};

//* More sophisticated variant *//

const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
const urlSchemeRegex = /^.+(:|:)/gim;
const relativeFirstCharacters = [".", "/"];

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

function decodeHtmlCharacters(str: string) {
  return str.replace(htmlEntitiesRegex, (_match, dec) => {
    return String.fromCharCode(dec);
  });
}

function isEncoded(uri: string): boolean {
  uri = uri || "";
  return uri !== decodeURIComponent(uri);
}

function fullyDecodeURI(uri: string): string {
  while (isEncoded(uri)) {
    uri = decodeURIComponent(uri);
  }
  return uri;
}

const validateUrl = (url: string): string => {
  try {
    // decode and trim - prepare the url to be analysed
    const sanitisedUrl = decodeHtmlCharacters(fullyDecodeURI(url))
      .replace(htmlCtrlEntityRegex, "")
      .replace(ctrlCharactersRegex, "")
      .trim();
    // if there is nothing to analyse, return blank
    if (!sanitisedUrl) {
      return "about:blank";
    }
    // return url as is, if the url starts from . or /
    if (isRelativeUrlWithoutProtocol(sanitisedUrl)) {
      return url;
    }
    // try to get the scheme and return the original url, if there is no scheme
    const urlSchemeParseResults = sanitisedUrl.match(urlSchemeRegex);
    if (!urlSchemeParseResults) {
      return url;
    }
    // if the scheme is in the blacklist, return blank
    const urlScheme = urlSchemeParseResults[0];
    if (invalidProtocolRegex.test(urlScheme)) {
      return "about:blank";
    }
    // otherwise return the original url
    return url;
  } catch {
    return "about:blank";
  }
};

export default validateUrl;

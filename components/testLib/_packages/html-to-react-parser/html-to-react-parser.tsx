import { FC, useMemo } from 'react';
import { Text } from './Text/Text';
import parse, {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { Props } from 'html-react-parser/lib/attributes-to-props';
import { decodeHtml } from './decode-html/index';
import { Link } from './link/index';

export const HtmlToReactParser: FC<HtmlToReactParserProps> = ({ children }) => {
  const options: HTMLReactParserOptions = useMemo(
    () => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      replace: (domNode: DOMNode) => {
        const element = domNode as Element;

        if (element.type !== 'tag' || !element.attribs) {
          return element;
        }

        switch (element.name) {
          case 'p':
            return <Text>{domToReact(element.children, options)}</Text>;
          case 'a':
            return (
              <Link
                {...(attributesToProps(element.attribs) as Props & {
                  href: string;
                })}
              >
                {domToReact(element.children, options)}
              </Link>
            );
          default:
            return element;
        }
      },
    }),
    [],
  );

  return <>{parse(decodeHtml(children), options)}</>;
};

HtmlToReactParser.displayName = 'HtmlToReactParserProps';

interface HtmlToReactParserProps {
  children: string;
}

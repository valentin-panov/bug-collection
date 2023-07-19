import React from "react";
import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import { Element } from "domhandler/lib/node";
import styles from "@components/testLib/safe_AsPathLinkLink/SafeAsPathLink.module.scss";
import { Heading, Link, Text } from "@packages/index";

const parseHtmlStringToLoop = (
  payload: string
): string | JSX.Element | JSX.Element[] => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.type === "tag") {
          switch (domNode.name) {
            case "a":
              return (
                <>
                  <Link
                    href={domNode.attribs.href}
                    target={domNode.attribs.target}
                  >
                    {domToReact(domNode.children, options)}
                  </Link>
                </>
              );
            case "p":
              return (
                <>
                  <Text>{domToReact(domNode.children, options)}</Text>
                </>
              );
            case "h1":
              return (
                <>
                  <Heading level="1">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "h2":
              return (
                <>
                  <Heading level="2">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "h3":
              return (
                <>
                  <Heading level="3">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "h4":
              return (
                <>
                  <Heading level="4">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "h5":
              return (
                <>
                  <Heading level="5">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "h6":
              return (
                <>
                  <Heading level="6">
                    {domToReact(domNode.children, options)}
                  </Heading>
                </>
              );
            case "ul":
              return (
                <>
                  <Text>
                    <ul>{domToReact(domNode.children, options)}</ul>
                  </Text>
                </>
              );
            default:
              return undefined;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
  };

  return parse(payload, options);
};

interface Props {
  payload: string;
}

const ParseHtmlStringToLoop: React.FC<Props> = ({ payload }) => {
  const sample = `parseHtmlStringToLoop(payload)`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
        {parseHtmlStringToLoop(payload)}
      </div>
    </>
  );
};

export default ParseHtmlStringToLoop;

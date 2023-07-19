import React from "react";
import styles from "./ReactParserDomToReact.module.scss";
import { HtmlToReactParser } from "@components/testLib/_packages/html-to-react-parser";

// import purify from "dompurify";

interface Props {
  payload: string;
}

const ReactParserDomToReact: React.FC<Props> = ({ payload }) => {
  // const sample = `<p id="main">
  //   <span class="prettify">
  //    ${payload}
  //   </span>
  // </p>`;
  return (
    <>
      <h2>{`TRY IFRAME! => <HtmlToReactParser>${payload}</HtmlToReactParser>`}</h2>
      <div className={styles.code}>
        <HtmlToReactParser>{payload}</HtmlToReactParser>
        {/*<HtmlToReactParser>{purify.sanitize(sample)}</HtmlToReactParser>*/}
      </div>
    </>
  );
};

export default ReactParserDomToReact;

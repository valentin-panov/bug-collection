import React from "react";
import styles from "./ReactParser.module.scss";
import parse from "html-react-parser";

// import purify from "dompurify";

interface Props {
  payload: string;
}

const ReactParser: React.FC<Props> = ({ payload }) => {
  const sample = `<hr id="foo" class="bar" data-attr="baz" style="${payload}">`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me! {parse(sample)}
        {/*inspect me! {parse(purify.sanitize(sample))}*/}
      </div>
    </>
  );
};

export default ReactParser;

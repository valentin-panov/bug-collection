import React, { useMemo } from "react";
import styles from "./htmlAttr.module.scss";

interface Props {
  payload: string;
}

const HtmlAttr: React.FC<Props> = ({ payload }) => {
  const xssObject = useMemo((): Record<string, string> => {
    return {
      id: payload,
      "aria-label": payload,
    };
  }, [payload]);

  return (
    <>
      <h2>DIV HTML ATTRIBUTES</h2>
      <div className={styles.code} {...xssObject}>
        I&apos;m a &lt;div&nbsp;{`{...payload}/`}&gt;. Inspect me!
        {/*{"<" + `div {...props} = ${JSON.stringify(xssObject)}` + "/"}*/}
      </div>
    </>
  );
};

export default HtmlAttr;

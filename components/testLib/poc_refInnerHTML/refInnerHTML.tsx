import React, { useEffect, useRef } from "react";
import styles from "./refInnerHTML.module.scss";

interface Props {
  payload: string;
}

const RefInnerHTML: React.FC<Props> = ({ payload }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      const element = codeRef.current as HTMLElement;
      element.innerHTML = payload;
    }
  }, [payload]);

  return (
    <>
      <h2>ref.current.innerHTML</h2>
      <p className={styles.description}>
        Inspect me!
        <br />
        <code className={styles.code} ref={codeRef}>
          NULL
        </code>
      </p>
    </>
  );
};

export default RefInnerHTML;

// worked xss
// <img src=xxx:x onerror=javascript:alert(1)> -->

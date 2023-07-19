import React, { useEffect } from "react";
import styles from "./ObjectAssign.module.scss";

interface Props {
  payload: string;
}

const ObjectAssign: React.FC<Props> = ({ payload }) => {
  const sample = `Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: ${payload},
    }).click()`;

  function openInNewTab(href: string) {
    console.log('payload inserted')
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: href,
    }).click()
  }

  useEffect(()=>{openInNewTab(payload)}, [payload])

  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
      </div>
    </>
  );
};

export default ObjectAssign;

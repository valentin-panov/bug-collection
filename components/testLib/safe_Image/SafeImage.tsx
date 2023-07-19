import React from "react";
import styles from "./SafeImage.module.scss";
import { Image } from "@packages/index";

interface Props {
  payload: string;
}

const SafeImage: React.FC<Props> = ({ payload }) => {
  const sample = `<Image src={payload}  alt={payload}/>`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
        <Image src={payload} alt={payload} />
      </div>
    </>
  );
};

export default SafeImage;

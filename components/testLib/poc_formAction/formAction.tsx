import React from "react";
import s from "./formAction.module.scss";
import { Button } from "@mui/material";

interface Props {
  payload: string;
}

const FormAction: React.FC<Props> = ({ payload }) => {
  const sample = `<form action={payload} method={"POST"}>`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={s.code}>
        inspect me!
        <form action={payload} method={"POST"}>
          <Button variant={"outlined"} type={"submit"}>
            SUBMIT
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormAction;

import React from "react";
import { Button } from "@mui/material";

interface Props {
  payload: string;
}

const WindowOpen: React.FC<Props> = ({ payload }) => {
  const windowOpenButton = (value: string) => {
    window.open(value, "_blank")?.focus();
  };

  return (
    <div>
      <h2>window.open(payload, &quot;_blank&quot;)?.focus();</h2>
      <Button variant="outlined" onClick={() => windowOpenButton(payload)}>
        TRY ME!
      </Button>
    </div>
  );
};

export default WindowOpen;

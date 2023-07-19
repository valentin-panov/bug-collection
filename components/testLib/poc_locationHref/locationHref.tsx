import React from "react";
import { Button } from "@mui/material";

interface Props {
  payload: string;
}

const LocationHref: React.FC<Props> = ({ payload }) => {
  const windowLocationButton = (value: string) => {
    window.location.href = value;
  };

  return (
    <div>
      <h2>window.location.href = {payload}</h2>
      <Button variant="outlined" onClick={() => windowLocationButton(payload)}>
        TRY ME!
      </Button>
    </div>
  );
};

export default LocationHref;

import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Props {
  payload: string;
}

const ExampleRouter: React.FC<Props> = ({ payload }) => {
  const [switcher, setSwitcher] = useState<string>("0");
  const [resultURL, setResultURL] = useState<string>("");
  const [basePath, setBasePath] = useState<string>("");

  useEffect(() => {
    setBasePath(window.location.href);
  }, []);

  useEffect(() => {
    setResultURL(
      `${switcher === "1" ? window.location.href + "/" : ""}${payload}`
    );
  }, [payload, switcher]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitcher((event.target as HTMLInputElement).value);
  };

  const router = async (payload: string): Promise<void> => {
    await Router.push(payload);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>next/router.push(payload)</h2>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={switcher}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label={payload} />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label={basePath + "/" + payload}
          />
        </RadioGroup>
      </FormControl>
      <Button variant={"outlined"} onClick={() => router(resultURL)}>
        TRY ME!
      </Button>
    </div>
  );
};

export default ExampleRouter;

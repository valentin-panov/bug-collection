import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import s from "./Button.module.scss";

interface IGradientButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  onClick?: () => void;
}

const GradientButton: React.FC<IGradientButtonProps> = ({
  type = "button",
  size,
  loading = false,
  onClick,
  children,
}) => {
  return (
    <>
      {loading ? (
        <LoadingButton
          size={size}
          loading
          loadingPosition="start"
          startIcon={<LoginIcon />}
          variant="outlined"
          className={s.btn}
        >
          Loading...
        </LoadingButton>
      ) : (
        <Button
          size={size}
          variant={"contained"}
          type={type}
          onClick={onClick}
          className={`${s.btn} ${s.btn_gradient}`}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default GradientButton;

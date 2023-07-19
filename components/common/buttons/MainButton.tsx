import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import s from "./Button.module.scss";

interface IButton {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
}

const MainButton: React.FC<IButton> = ({
  type = "button",
  text,
  loading,
  onClick,
  size,
  variant = "outlined",
}) => (
  <>
    {loading ? (
      <LoadingButton
        loading
        loadingPosition="start"
        variant={variant}
        size={size}
        startIcon={<LoginIcon />}
        className={s.btn}
      >
        <span>Loading...</span>
      </LoadingButton>
    ) : (
      <Button
        variant={variant}
        type={type}
        onClick={onClick}
        size={size}
        className={s.btn}
      >
        {text}
      </Button>
    )}
  </>
);

export default MainButton;

import React from "react";
import MainButton from "./MainButton";
import { useRouter } from "next/router";

interface IGradientLink {
  to: string;
  text: string;
  size?: "small" | "medium" | "large";
  rounded?: boolean;
}

const GradientLink: React.FC<IGradientLink> = ({
  to,
  text,
  size = "medium",
}) => {
  const router = useRouter();
  const onClick = async () => {
    await router.push(to);
  };
  return (
    <MainButton
      text={text}
      loading={false}
      size={size}
      onClick={onClick}
      variant={"contained"}
    />
  );
};

export default GradientLink;

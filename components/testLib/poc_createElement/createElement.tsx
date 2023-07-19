import React from "react";

interface Props {
  payload: string;
}

const CreateElement: React.FC<Props> = ({ payload }) => {
  const [type, propsPayload, childrenPayload] = payload.split("|");
  const props = { className: propsPayload };
  const children: React.ReactNode = childrenPayload;
  return React.createElement(type, props, children);
};

export default CreateElement;

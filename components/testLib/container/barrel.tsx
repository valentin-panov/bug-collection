import React from "react";

interface Props {
  componentName: string;
  payload: string;
  components: {
    [propName: string]: React.FunctionComponent<{ payload: string }>;
  };
}

const Barrel: React.FC<Props> = ({ componentName, payload, components }) => {
  const DynamicComponent = components[componentName];
  return <DynamicComponent payload={payload} />;
};

export default Barrel;

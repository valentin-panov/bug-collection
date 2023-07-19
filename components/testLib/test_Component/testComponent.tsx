import React, { createRef, useEffect } from "react";
import xssFilters from "xss-filters";
import { decodeURLnew } from "@utils/url-parse";

interface Props {
  payload: string;
}

const TestComponent: React.FC<Props> = ({ payload }) => {
  const tooltipId = payload;
  const tooltipRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute(
        "aria-describedby",
        `tooltip_${tooltipId}`
      );
      tooltipRef.current.innerHTML = xssFilters.inHTMLData(payload);
    }
  }, [payload, tooltipId, tooltipRef]);

  return (
    <a ref={tooltipRef} href={decodeURLnew(payload)}>
      INSPECT ME!
    </a>
  );
};

export default TestComponent;

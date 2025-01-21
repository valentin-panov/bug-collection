import React from "react";

// import xssFilters from "xss-filters";
// import { decodeURLnew } from "@utils/url-parse";
import { newSanitizeHtml } from "@components/testLib/test_Component/newSanitizeHtml";

interface Props {
  payload: string;
}

const TestComponent: React.FC<Props> = ({ payload }) => {
  // const tooltipId = payload;
  // const tooltipRef = createRef<HTMLAnchorElement>();
  //
  // useEffect(() => {
  //   if (tooltipRef.current) {
  //     tooltipRef.current.setAttribute(
  //       "aria-describedby",
  //       `tooltip_${tooltipId}`
  //     );
  //     tooltipRef.current.innerHTML = xssFilters.inHTMLData(payload);
  //   }
  // }, [payload, tooltipId, tooltipRef]);

  return (
    <>
      <div id="NEW">{newSanitizeHtml(payload)}</div>
      {/*<a ref={tooltipRef} href={decodeURLnew(payload)}>*/}
      {/*INSPECT ME!*/}
      {/*</a>*/}
    </>
  );
};

export default TestComponent;

import styles from "./testContainer.module.scss";
import React from "react";
import {
  BaseServiceComponent,
  ClassicInput,
  ClassN,
  CreateElement,
  DataTestId,
  DSIH,
  DSIHscript,
  ExampleRouter,
  FormAction,
  HtmlAttr,
  LocationHref,
  NextRedirect,
  ObjectAssign,
  ParseHtmlStringToLoop,
  PopulatedInput,
  PrototypePollution,
  ReactParser,
  ReactParserDomToReact,
  RefInnerHTML,
  SafeAsPathLink,
  SafeImage,
  TestComponent,
  WindowOpen,
} from "@components/testLib";
import Barrel from "@components/testLib/container/barrel";

const components: {
  [propName: string]: React.FunctionComponent<{ payload: string }>;
} = {
  TestComponent: TestComponent,
  POC_next_router_push: ExampleRouter,
  POC_form_action: FormAction,
  POC_location_href: LocationHref,
  POC_next_redirect: NextRedirect,
  POC_window_open: WindowOpen,
  POC_dangerouslySetInnerHTML: DSIH,
  POC_ref_InnerHTML: RefInnerHTML,
  POC_proto_pollution_RCE: PrototypePollution,
  POC_reactCreateElement: CreateElement,
  POC_html_react_parser: ReactParser,
  POC_ReactParserDomToReact: ReactParserDomToReact,
  POC_parseHtmlStringToLoop: ParseHtmlStringToLoop,
  POC_ObjectAssign: ObjectAssign,
  SAFE_classNames: ClassN,
  SAFE_data_Test_Id: DataTestId,
  SAFE_html_Attr: HtmlAttr,
  SAFE_dangerouslySetInnerHTML_script: DSIHscript,
  SAFE_input: PopulatedInput,
  SAFE_Image_package: SafeImage,
  SAFE_asPathLink: SafeAsPathLink,
  SAFE_BaseService: BaseServiceComponent,
};

const examples: string[] = [
  `javascript:alert(1)`,
  `javascript:alert(document.cookie.split(';'))`,
  `<img src="xxx:x" onerror=alert('pwnd')>`,
  `<iframe src="javascript:alert(1)">`,
  `For createElement only: scRipt|javascript|alert(1)`,
];

const TestContainer: React.FC = () => {
  const [inputString, setInputString] = React.useState(examples[0]);
  const [element, setElement] = React.useState(Object.keys(components)[0]);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <ClassicInput
            value={inputString}
            onChangeHandler={onChangeInputHandler}
          />
          <p>Examples:</p>
          <ul>
            {examples.map((el) => (
              <li key={el}>
                <p>{el}</p>
              </li>
            ))}
          </ul>
          <br />
          <label htmlFor={"element_select"}>Tested element: </label>
          <select
            id="element_select"
            defaultValue={element}
            onChange={(e) => setElement(e.target.value)}
            className={styles.card_selectBlock}
          >
            {Object.keys(components).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.card}>
          <Barrel
            componentName={element}
            payload={inputString}
            components={components}
          />
        </div>
      </div>
    </>
  );
};

export default TestContainer;

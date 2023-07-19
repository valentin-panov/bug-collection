import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

import "./Text.module.scss";

/**
 * Use `Text` to display text.
 */
const Text: FC<TextProps> = ({
  children,
  className,
  isInline,
  isMeasured,
  elementType: ElementType = "p",
  testId,
  ...rest
}) => (
  <ElementType
    data-testid={testId}
    {...rest}
    className={classNames({
      "lc-Text": true,
      "lc-Text--inline": isInline,
      "lc-Text--measured": isMeasured,
      [`${className}`]: className,
    })}
  >
    {children}
  </ElementType>
);

type Props = HTMLAttributes<HTMLSpanElement> &
  HTMLAttributes<HTMLParagraphElement>;

export interface TextProps extends Omit<Props, "className" | "children"> {
  /**
   * Text and inline markup to display in the Text.
   */
  children: ReactNode;

  /**
   * Branded component classNames to be composed into the Text.
   */
  className?: string;

  /**
   * Should the Text component be styled as an inline element.
   */
  isInline?: boolean;

  /**
   * Should the Text width be constrained to a typographic measure?
   */
  isMeasured?: boolean;

  /**
   * HTML element type to be used as text wrapper
   * @default 'p'
   */
  elementType?: "p" | "span";
  /**
   * Optional string to render in a `data-testid` attribute to allow the Text
   * to be found in tests.
   */
  testId?: string;
}

export default Text;

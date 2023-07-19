import { FC, HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

import "./Heading.module.scss";

/**
 * Use `Heading` to display heading text.
 */
const Heading: FC<HeadingProps> = ({
  children,
  className,
  isInline,
  level,
  testId,
  ...rest
}): JSX.Element => {
  let ElementType: keyof JSX.IntrinsicElements = "span";

  if (level && !isInline) {
    ElementType = `h${level}`;
  }

  return (
    <ElementType
      data-testid={testId}
      {...rest}
      className={classNames({
        "lc-Heading": true,
        "lc-Heading--inline": isInline,
        [`${className}`]: className,
      })}
    >
      {children}
    </ElementType>
  );
};

export type HeadingLevel = "1" | "2" | "3" | "4" | "5" | "6";

type Props = HTMLAttributes<HTMLSpanElement> &
  HTMLAttributes<HTMLHeadingElement>;

export interface HeadingProps extends Omit<Props, "className" | "children"> {
  /**
   * Text and inline markup to display in the Heading.
   */
  children: ReactNode;

  /**
   * Branded component classNames to be composed into the Heading.
   */
  className?: string;

  /**
   * Sets the Heading component to be styled as an inline element.
   */
  isInline?: boolean;

  /**
   * HTML section heading level. If not provided, the Heading will render as
   * a span.
   */
  level?: HeadingLevel;
  /**
   * Optional string to render in a `data-testid` attribute to allow the Heading
   * to be found in tests.
   */
  testId?: string;
}

export default Heading;

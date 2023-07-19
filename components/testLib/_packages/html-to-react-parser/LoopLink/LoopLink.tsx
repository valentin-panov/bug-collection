import { forwardRef, ReactNode } from "react";
import classNames from "classnames";

import "./LoopLink.module.scss";

/**
 * Use `Link` to hyperlink between pages.
 */

// eslint-disable-next-line react/display-name
export const LoopLink = forwardRef<HTMLAnchorElement, LoopLinkProps>(
  (
    {
      children,
      className,
      "data-analytics-max-track": analyticsMaxTrack,
      icon,
      isBold,
      isDisplayBlock,
      leading,
      testId,
      trailing,
      analyticsLabel,
      ...props
    },
    ref
  ) => (
    <a
      className={classNames({
        "lc-Link": true,
        "lc-Link--isBold": isBold,
        "lc-Link--displayBlock": isDisplayBlock,
        "lc-Link--withLeading": leading,
        "lc-Link--withTrailing": trailing,
        [`${className}`]: className,
      })}
      data-testid={testId}
      data-analytics-link={analyticsLabel}
      data-analytics-max-track={analyticsMaxTrack}
      ref={ref}
      {...props}
    >
      {leading === "icon" && <span className="lc-Link-leading">{icon}</span>}
      {children}
      {trailing === "icon" && <span className="lc-Link-trailing">{icon}</span>}
    </a>
  )
);

interface LeadingProps {
  /**
   * Element added before Link text.<br />
   * In the case of icon, `iconName` must be specified.
   */
  leading?: "icon";

  trailing?: never;
}

interface TrailingProps {
  leading?: never;

  /**
   * Element added after Link text.<br />
   * In the case of icon, `iconName` must be specified.
   */
  trailing?: "icon";
}

type LeadingOrTrailingProps = LeadingProps | TrailingProps;

interface LinkBaseProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text.
   */
  children: ReactNode;

  /**
   * Branded component classNames to be composed into the Link.
   */
  className?: string;

  /**
   * Number to render in a `data-analytics-max-track` attribute to
   * define the limit to the number of clicks captured by analytics per page load.
   */
  "data-analytics-max-track"?: number;

  /**
   * Decorative icon to be used together with `Link`
   */
  icon?: React.ReactNode;

  /**
   * Is the link bold?
   */
  isBold?: boolean;

  /**
   * Should the Link's CSS display property be set to block?
   */
  isDisplayBlock?: boolean;

  /**
   * Link destination.
   */
  href?: string;

  /**
   * Relationship between the Link href URL and the current page. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).
   */

  rel?: string;

  /**
   * Target window for the Link href URL.
   */
  target?: string;

  /**
   * Optional string to render in a `data-testid` attribute to allow the Link
   * to be found in tests.
   */
  testId?: string;

  /**
   * Optional string to render in a `data-analytics-link` attribute to allow the Link
   * events captured by analytics.
   * @see https://wiki.intdigital.ee.co.uk/pages/viewpage.action?pageId=156816969
   */
  analyticsLabel?: string;
}

export type LoopLinkProps = LinkBaseProps & LeadingOrTrailingProps;

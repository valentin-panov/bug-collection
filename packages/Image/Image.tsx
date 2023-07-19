import React, { FC } from "react";
import classNames from "classnames";

// import "lazysizes";
// import "lazysizes/plugins/attrchange/ls.attrchange";
import "./Image.module.scss";

const Image: FC<ImageProps> = ({
  responsive,
  lazyLoaded,
  additionalClasses,
  src,
  alt,
  ...rest
}) => {
  const source = { [lazyLoaded ? "data-src" : "src"]: src };
  return (
    <img
      {...source}
      key={src}
      alt={alt}
      data-sizes="auto"
      className={classNames("lxp-Image", {
        "lxp-Image--responsive": responsive,
        lazyload: lazyLoaded,
        [`${additionalClasses}`]: additionalClasses,
      })}
      {...rest}
    />
  );
};

Image.displayName = "Image";

type HTMLImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export interface ImageProps extends Omit<HTMLImgProps, "className"> {
  /**
   *  Whether the image is responsive
   */
  responsive?: boolean;

  /**
   * Enable/disable image lazy loading (default: 'false')
   */
  lazyLoaded?: boolean;

  /**
   * Adding custom classes
   */
  additionalClasses?: string;

  /**
   * The url for the location for the the image
   */
  src: string;

  /**
   * Specifies an alternate text for an image
   */
  alt: string;
}

export default Image;

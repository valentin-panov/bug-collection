import { FC, MouseEvent } from 'react';
import {
  LoopLink,
   LoopLinkProps,
} from '../LoopLink/LoopLink';
import { useRouter } from "next/router";


export type LinkProps = LoopLinkProps;

export const Link: FC<LinkProps> = ({ href, onClick, ...props }) => {
  const router = useRouter();

  const navigateTo = (e: MouseEvent<HTMLAnchorElement>): void => {
    onClick?.(e);

    if (!href || props.target === '_blank') {
      return;
    }
    e.preventDefault();

    router.push(href);
  };

  return <LoopLink {...props} href={href} onClick={navigateTo} >Link to {href}</LoopLink>;
};

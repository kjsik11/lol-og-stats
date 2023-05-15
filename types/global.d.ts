import { PropsWithChildren } from 'react';

declare global {
  type OurDate = Date | string;
  type ComponentDefaultProps = {
    className?: string;
  };
  type ComponentDefaultPropsWithChildren = PropsWithChildren<ComponentDefaultProps>;
}

export {};

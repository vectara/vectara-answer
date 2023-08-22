import { ForwardedRef, forwardRef } from "react";
import { VuiAppSideNav, Props as VuiAppSideNavProps } from "./appSideNav/AppSideNav";

type Props = {
  children: React.ReactNode;
  navItems?: VuiAppSideNavProps["items"];
  navContent?: React.ReactNode;
};

export const VuiAppLayout = forwardRef(
  ({ children, navItems, navContent }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className="vuiAppLayout">
        <div className="vuiAppLayout__sideNav">
          <VuiAppSideNav items={navItems} content={navContent} />
        </div>

        <div className="vuiAppLayout__content" ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

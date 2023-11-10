import { ForwardedRef, forwardRef } from "react";
import classNames from "classnames";
import { VuiAppSideNav, Props as VuiAppSideNavProps } from "./appSideNav/AppSideNav";

type Props = {
  children: React.ReactNode;
  navItems?: VuiAppSideNavProps["items"];
  navContent?: React.ReactNode;
  full?: boolean;
};

export const VuiAppLayout = forwardRef(
  ({ children, navItems, navContent, full }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const classes = classNames("vuiAppLayout", {
      "vuiAppLayout--full": full
    });

    return (
      <div className={classes}>
        {(navItems || navContent) && (
          <div className="vuiAppLayout__sideNav">
            <VuiAppSideNav items={navItems} content={navContent} />
          </div>
        )}

        <div className="vuiAppLayout__content" ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { VuiIconButton } from "../../button/IconButton";
import { VuiIcon } from "../../icon/Icon";
import { buildSections } from "./AppSideNavSections";
import { buildTree } from "./AppSideNavTree";
import { Sections, Tree } from "../types";
import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";

export const buildSideNavItems = (items: Sections | Tree) => {
  return isTree(items) ? buildTree(items) : buildSections(items);
};

// Type guard to determine if we have a Tree or Sections.
const isTree = (items: Tree | Sections): items is Tree => {
  return (items as Tree).findIndex((item) => item.path) !== -1;
};

export type Props = {
  items?: Sections | Tree;
  content?: React.ReactNode;
};

export const VuiAppSideNav = ({ items = [], content }: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseButtonRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Prevent the button from being focused when it first renders.
    if (isTouched) {
      if (isCollapsed) {
        expandButtonRef.current?.focus();
      } else {
        collapseButtonRef.current?.focus();
      }
    }
  }, [isTouched, isCollapsed]);

  const classes = classNames("vuiAppSideNav", {
    "vuiAppSideNav-isCollapsed": isCollapsed
  });

  const contentClasses = classNames("vuiAppSideNavContent", {
    "vuiAppSideNavContent-isHidden": isCollapsed
  });

  const navItems = buildSideNavItems(items);

  return (
    <div className={classes}>
      <div className="vuiAppSideNav__inner">
        {isCollapsed ? (
          <VuiIconButton
            ref={expandButtonRef}
            aria-label="Expand nav"
            onClick={() => setIsCollapsed(false)}
            className="vuiAppSideNavExpandButton"
            color="neutral"
            icon={
              <VuiIcon>
                <BiChevronRight />
              </VuiIcon>
            }
          />
        ) : (
          <>
            <button
              ref={collapseButtonRef}
              className="vuiAppSideNavCollapseButton"
              onClick={() => {
                setIsTouched(true);
                setIsCollapsed(true);
              }}
            >
              <VuiFlexContainer alignItems="center" spacing="xxs">
                <VuiFlexItem shrink={false} grow={false}>
                  <VuiIcon>
                    <BiChevronLeft />
                  </VuiIcon>
                </VuiFlexItem>

                <VuiFlexItem shrink={false} grow={false}>
                  Collapse nav
                </VuiFlexItem>
              </VuiFlexContainer>
            </button>
          </>
        )}

        {/* @ts-expect-error React doesn't support inert yet */}
        <div className={contentClasses} inert={isCollapsed ? "" : null}>
          {navItems}
          {content}
        </div>
      </div>
    </div>
  );
};

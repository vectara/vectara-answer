import React, { cloneElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { VuiPortal } from "../portal/Portal";
import { FocusOn } from "react-focus-on";

export type Props = {
  button: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  padding?: boolean;
};

type Position = {
  top: number;
  right: number;
};

// See here: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export const VuiPopover = ({
  button: originalButton,
  children,
  className,
  header,
  isOpen,
  setIsOpen,
  padding,
  ...rest
}: Props) => {
  const returnFocusElRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [positionMarker, setPositionMarker] = useState<number>(0);

  const button = cloneElement(originalButton, {
    isSelected: isOpen,
    onClick: () => {
      setIsOpen(!isOpen);
    },
    ref: (node: HTMLElement) => {
      buttonRef.current = node;
    }
  });

  useEffect(() => {
    const updatePosition = () => {
      // Force a re-render when the window resizes.
      setPositionMarker(Date.now());
    };

    window.removeEventListener("resize", updatePosition);
    // Mostly defensive to prevent weird bugs where the popover ends
    // up being rendered partially off-screen.
    window.removeEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      returnFocusElRef.current = document.activeElement as HTMLElement;
    } else {
      returnFocusElRef.current?.focus();
      returnFocusElRef.current = null;
    }
  }, [isOpen]);

  // Allow contents to respond to blur events before unmounting, and also
  // enable focus to properly return to the button when the user clicks
  // outside of the popover.
  const onCloseDelayed = () => {
    window.setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  // Always keep menu position up to date. If we tried to cache this inside
  // a useEffect based on isOpen then there'd be a flicker if the width
  // of the button changes.
  //const position = getPosition(buttonRef.current);

  const classes = classNames("vuiPopover", className);

  const contentClasses = classNames("vuiPopoverContent", {
    "vuiPopoverContent--padding": padding
  });

  let position;

  if (buttonRef.current) {
    const { bottom, left } = buttonRef.current.getBoundingClientRect();
    position = {top: bottom, left: left};
  } else {
    position = {top: 0, left:  0};
  }

  return (
    <>
      {button}

      <VuiPortal>
        {isOpen && position && (
          <FocusOn
            onEscapeKey={onCloseDelayed}
            onClickOutside={onCloseDelayed}
            // Enable manual focus return to work.
            returnFocus={false}
            // Enable focus on contents when it's open,
            // but enable manual focus return to work when it's closed.
            autoFocus={isOpen}
            // Enable scrolling of the page.
            scrollLock={false}
            // Enable scrolling of the page.
            preventScrollOnFocus={false}
          >
            <div className={classes} style={{ top: `${position.top}px`, left: `${position.left}px` }} {...rest}>
              {header && typeof header === "string" ? <div className="vuiPopoverTitle">{header}</div> : header}
              {children && <div className={contentClasses}>{children}</div>}
            </div>
          </FocusOn>
        )}
      </VuiPortal>
    </>
  );
};

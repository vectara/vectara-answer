import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { VuiPortal } from "../portal/Portal";
import { FocusOn } from "react-focus-on";

type Props = {
  button: React.ReactElement;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type Position = {
  top: number;
  right: number;
};

const getPosition = (button: HTMLElement | null): Position | undefined => {
  if (!button) return undefined;
  const { bottom, right } = button.getBoundingClientRect();
  return {
    top: bottom - 1 + document.documentElement.scrollTop,
    right: window.innerWidth - right,
  };
};

export const VuiPopover = ({
  button: originalButton,
  children,
  isOpen,
  setIsOpen,
  ...rest
}: Props) => {
  const returnFocusElRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position | undefined>();

  const button = cloneElement(originalButton, {
    isPressed: isOpen,
    onClick: () => {
      setIsOpen(!isOpen);
    },
    ref: (node: HTMLElement) => {
      buttonRef.current = node;
    },
  });

  const onResizeWindow = useCallback(() => {
    // Keep posiiton as up-to-date as possible. We'd like to do that only
    // when the popover is visible, but unfortunately we've formed a closure
    // over a stale and unchanging isOpen value. So for now we're stuck with
    // inefficiently updating this on every resize, for every popover, regardless
    // of whether it's visible or not. Eventually perhaps useEffectEvent will
    // address this once it's GA:
    // https://react.dev/learn/separating-events-from-effects
    setPosition(getPosition(buttonRef.current));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResizeWindow);

    return () => {
      window.removeEventListener("resize", onResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Keep posiiton as up-to-date as possible, but only when the popover is visible.
      setPosition(getPosition(buttonRef.current));

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
            <div
              className="vuiPopover"
              style={{ top: `${position.top}px`, right: `${position.right}px` }}
              {...rest}
            >
              {children}
            </div>
          </FocusOn>
        )}
      </VuiPortal>
    </>
  );
};

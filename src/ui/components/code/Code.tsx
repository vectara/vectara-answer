import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import classNames from "classnames";
import { BiClipboard } from "react-icons/bi";
import { VuiIconButton } from "../button/IconButton";
import { VuiIcon } from "../icon/Icon";
import { CodeLanguage } from "./types";

type Props = {
  language?: CodeLanguage;
  onCopy?: () => void;
  children?: string;
  fullHeight?: boolean;
  "data-testid"?: string;
};

// PrismJS clears highlighting when language-none is set.
export const VuiCode = ({ onCopy, language = "none", fullHeight, children = "", ...rest }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children, language]);

  const containerClasses = classNames("vuiCodeContainer", {
    "vuiCodeContainer--fullHeight": fullHeight
  });

  const classes = classNames("vuiCode", `language-${language}`, {
    "vuiCode--fullHeight": fullHeight
  });

  const testId = rest["data-testid"];

  return (
    <div className={containerClasses} {...rest}>
      <pre className="vuiCodePre">
        <code className={classes}>{children}</code>
      </pre>

      <VuiIconButton
        color="neutral"
        icon={
          <VuiIcon>
            <BiClipboard size={20} />
          </VuiIcon>
        }
        aria-label="Copy to clipboard"
        className="vuiCodeCopyButton"
        onClick={() => {
          navigator.clipboard.writeText(children);
          if (onCopy) onCopy();
        }}
      />

      {/* Expose this for tests to assert against. */}
      {testId && (
        <div data-testid={`${testId}-hidden`} hidden>
          {children}
        </div>
      )}
    </div>
  );
};

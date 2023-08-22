import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import classNames from "classnames";
import { BiClipboard } from "react-icons/bi";
import { VuiIconButton } from "../button/IconButton";
import { VuiIcon } from "../icon/Icon";
import { useEffect } from "react";

type Props = {
  language?: "js" | "ts" | "jsx" | "tsx" | "none";
  onCopy?: () => void;
  children?: string;
  fullHeight?: boolean;
};

// PrismJS clears highlighting when language-none is set.
export const VuiCode = ({ onCopy, language = "none", fullHeight, children = "" }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  const containerClasses = classNames("vuiCodeContainer", {
    "vuiCodeContainer--fullHeight": fullHeight
  });

  const classes = classNames("vuiCode", `language-${language}`, {
    "vuiCode--fullHeight": fullHeight
  });

  return (
    <div className={containerClasses}>
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
    </div>
  );
};

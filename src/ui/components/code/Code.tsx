import { BiClipboard } from "react-icons/bi";
import { VuiButtonIcon } from "../button/ButtonIcon";
import { VuiIcon } from "../icon/Icon";

type Props = {
  onCopy?: () => void;
  children?: string;
};

export const VuiCode = ({ onCopy, children = "" }: Props) => {
  return (
    <div className="vuiCodeContainer">
      <pre className="vuiCode">
        <code>{children}</code>
      </pre>
      <VuiButtonIcon
        color="normal"
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

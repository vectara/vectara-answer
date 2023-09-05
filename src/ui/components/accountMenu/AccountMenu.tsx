import { VuiHorizontalRule } from "../horizontalRule/HorizontalRule";
import { VuiPopover } from "../popover/Popover";
import { VuiSpacer } from "../spacer/Spacer";

type AccountMenuInfo = Array<{
  title: string;
  value: React.ReactNode;
}>;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  button: React.ReactElement;
  info?: AccountMenuInfo;
  children?: React.ReactNode;
};

export const VuiAccountMenu = ({ isOpen, setIsOpen, button, info, children }: Props) => {
  return (
    <VuiPopover
      className="vuiAccountMenu"
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(!isOpen)}
      button={button}
      header={
        info &&
        info.length > 0 && (
          <div className="vuiAccounrMenuHeader">
            {info.map((item, index) => (
              <div key={index} className="vuiAccountMenuHeaderItem">
                <div className="vuiAccountMenuHeaderItem__title">{item.title}</div>
                <div className="vuiAccountMenuHeaderItem__value">{item.value}</div>
                {index < info.length - 1 && (
                  <>
                    <VuiSpacer size="xs" />
                    <VuiHorizontalRule />
                    <VuiSpacer size="xs" />
                  </>
                )}
              </div>
            ))}
          </div>
        )
      }
    >
      {children}
    </VuiPopover>
  );
};

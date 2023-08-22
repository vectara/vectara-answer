import { VuiPopover } from "../popover/Popover";

type AccountMenuInfo = Array<{
  title: string;
  value: string;
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

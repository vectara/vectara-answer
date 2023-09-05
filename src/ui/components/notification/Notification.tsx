import classNames from "classnames";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIconButton } from "../button/IconButton";
import { VuiIcon } from "../icon/Icon";
import { BiX } from "react-icons/bi";

export type Notification = {
  color: "primary" | "success" | "warning" | "danger";
  message: string;
};

type Props = {
  notification: Notification;
  onDismiss: (notification: Notification) => void;
  placeholder?: boolean;
};

export const VuiNotification = ({ notification, onDismiss, placeholder }: Props) => {
  const { color, message } = notification;
  const classes = classNames("vuiNotification", `vuiNotification--${color}`);
  return (
    <div className="vuiNotificationContainer">
      <div className={classes}>
        <VuiFlexContainer alignItems="start" spacing="s">
          <VuiFlexItem grow={false}>
            <VuiIconButton
              size="xs"
              color="neutral"
              icon={
                <VuiIcon>
                  <BiX />
                </VuiIcon>
              }
              onClick={() => onDismiss(notification)}
            />
          </VuiFlexItem>

          <VuiFlexItem grow={1}>
            <VuiText>
              <VuiTextColor color={color}>{message}</VuiTextColor>
            </VuiText>
          </VuiFlexItem>
        </VuiFlexContainer>
      </div>

      {placeholder && <div className="vuiNotification vuiNotification--placeholder" />}
    </div>
  );
};

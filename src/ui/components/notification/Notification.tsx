import classNames from "classnames";
import { BiX } from "react-icons/bi";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIconButton } from "../button/IconButton";
import { VuiIcon } from "../icon/Icon";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiHorizontalRule } from "../horizontalRule/HorizontalRule";

export type Notification = {
  color: "primary" | "success" | "warning" | "danger";
  message: string;
};

type Props = {
  notification: Notification;
  onDismiss: (notification: Notification) => void;
  notificationsCount: number;
  children?: React.ReactNode;
};

export const VuiNotification = ({ notification, onDismiss, notificationsCount, children }: Props) => {
  const { color, message } = notification;
  const classes = classNames("vuiNotification", `vuiNotification--${color}`);
  const hasManyNotifications = notificationsCount > 1;

  const placeholder1Classes = classNames("vuiNotification", "vuiNotificationPlaceholder", {
    "vuiNotificationPlaceholder1-isVisible": notificationsCount > 1
  });

  const placeholder2Classes = classNames("vuiNotification", "vuiNotificationPlaceholder", {
    "vuiNotificationPlaceholder2-isVisible": notificationsCount > 2
  });

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

            {hasManyNotifications && (
              <>
                <VuiSpacer size="xxs" />
                <VuiText size="xs">
                  <VuiTextColor color="subdued">+{notificationsCount - 1} more</VuiTextColor>
                </VuiText>
              </>
            )}
          </VuiFlexItem>
        </VuiFlexContainer>

        {children && (
          <>
            <VuiSpacer size="s" />
            <VuiHorizontalRule />
            <VuiSpacer size="xxs" />
            {children}
          </>
        )}
      </div>

      <div className={placeholder2Classes} />
      <div className={placeholder1Classes} />
    </div>
  );
};

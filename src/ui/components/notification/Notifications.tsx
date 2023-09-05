import classNames from "classnames";
import { VuiButtonPrimary } from "../button/ButtonPrimary";
import { VuiButtonSecondary } from "../button/ButtonSecondary";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiSpacer } from "../spacer/Spacer";
import { Notification, VuiNotification } from "./Notification";
import { useEffect, useRef } from "react";

type Props = {
  notifications: Notification[];
  onShowAll: () => void;
  onDismiss: (notification: Notification) => void;
  onDismissAll: () => void;
  onClose: () => void;
};

export const VuiNotifications = ({ notifications, onShowAll, onDismiss, onDismissAll, onClose }: Props) => {
  const timeoutRef = useRef<any>();

  const startTimeout = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 8000);

    return timeoutRef.current;
  };

  useEffect(() => {
    startTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [notifications]);

  const onMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const onMouseLeave = () => {
    startTimeout();
  };

  if (!notifications.length) return null;

  const classes = classNames("vuiNotificationList", {
    "vuiNotificationList--hasMany": notifications.length > 1
  });

  return (
    <div className={classes} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="vuiNotificationList__notifications">
        <VuiNotification
          notification={notifications[notifications.length - 1]}
          onDismiss={onDismiss}
          placeholder={notifications.length > 1}
        />

        {notifications.length > 1 && (
          <>
            <VuiSpacer size="xs" />

            <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
              <VuiFlexItem>
                <VuiButtonSecondary color="primary" onClick={onShowAll} solid>
                  See {notifications.length} notifications
                </VuiButtonSecondary>
              </VuiFlexItem>

              <VuiFlexItem>
                <VuiButtonPrimary color="primary" onClick={onDismissAll}>
                  Dismiss all
                </VuiButtonPrimary>
              </VuiFlexItem>
            </VuiFlexContainer>
          </>
        )}
      </div>
    </div>
  );
};

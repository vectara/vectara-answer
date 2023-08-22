import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiText } from "../typography/Text";

export const PROGRESS_BAR_COLOR = ["accent", "primary", "danger", "warning", "success", "neutral"] as const;

type Props = {
  color: (typeof PROGRESS_BAR_COLOR)[number];
  percentage: number;
  className?: string;
  value?: string;
};

export const VuiProgressBar = ({ color, percentage, className, value, ...rest }: Props) => {
  const classes = classNames(className, "vuiProgressBar", `vuiProgressBar--${color}`);

  const bar = (
    <div className={classes} {...rest}>
      <div className="vuiProgressBar__empty" />
      <div className="vuiProgressBar__bar" style={{ width: `${percentage}%` }} />
      <div className="vuiProgressBar__outline" />
    </div>
  );

  if (value) {
    return (
      <VuiFlexContainer alignItems="center" spacing="xs">
        <VuiFlexItem grow={false} shrink={false}>
          <VuiText>
            <p>{value}</p>
          </VuiText>
        </VuiFlexItem>

        <VuiFlexItem grow={1}>{bar}</VuiFlexItem>
      </VuiFlexContainer>
    );
  }

  return bar;
};

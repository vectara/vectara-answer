import classNames from "classnames";
import { VuiButtonSecondary } from "../button/ButtonSecondary";

type Props = {
  reference: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const VuiSummaryCitation = ({
  reference,
  isSelected,
  onClick,
}: Props) => {
  const classes = classNames("vuiSummaryCitation", {
    "vuiSummaryCitation-isSelected": isSelected,
  });

  return (
    <VuiButtonSecondary
      color="primary"
      size="xs"
      className={classes}
      onClick={onClick}
      isSelected={isSelected}
    >
      {reference}
    </VuiButtonSecondary>
  );
};

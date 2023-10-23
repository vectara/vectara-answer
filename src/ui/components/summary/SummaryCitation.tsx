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
    <button className={classes} onClick={onClick}>
      {reference}
    </button>
  );
};

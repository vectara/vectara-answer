import classNames from "classnames";

type Props = {
  reference: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const VuiSummaryCitation = ({ reference, isSelected, onClick, className, ...rest }: Props) => {
  const classes = classNames("vuiSummaryCitation", className, {
    "vuiSummaryCitation-isSelected": isSelected
  });

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {reference}
    </button>
  );
};

import classNames from "classnames";

type Props = {
  reference: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const VuiSummaryCitation = ({ reference, isSelected, onClick, ...rest }: Props) => {
  const classes = classNames("vuiSummaryCitation", {
    "vuiSummaryCitation-isSelected": isSelected
  });

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {reference}
    </button>
  );
};

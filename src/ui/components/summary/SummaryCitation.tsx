import { VuiButtonEmpty } from "../button/ButtonEmpty";

type Props = {
  children: string;
  marginBefore?: boolean;
  marginAfter?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
};

export const VuiSummaryCitation = ({ children isSelected, onClick }: Props) => {
  return (
    <VuiButtonEmpty color="primary" size="xs" className="vuiSummaryCitation" onClick={onClick} isSelected={isSelected}>
      {children}
    </VuiButtonEmpty>
  );
};

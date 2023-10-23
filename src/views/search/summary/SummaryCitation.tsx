import { useSearchContext } from "../../../contexts/SearchContext";
import { VuiSummaryCitation } from "../../../ui/components/summary/SummaryCitation";

type Props = {
  reference: string;
};

export const SummaryCitation = ({ reference }: Props) => {
  const { selectedSearchResultPosition, selectSearchResultAt } =
    useSearchContext();

  const position = parseInt(reference, 10);
  const isSelected =
    selectedSearchResultPosition === undefined
      ? false
      : selectedSearchResultPosition + 1 === position;

  return (
    <>
      {" "}
      <VuiSummaryCitation
        reference={reference}
        onClick={() => selectSearchResultAt(position - 1)}
        isSelected={isSelected}
      />
    </>
  );
};

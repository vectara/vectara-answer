import { VuiText } from "../typography/Text";
import { VuiSummaryCitation } from "./SummaryCitation";
import { extractCitations } from "./extractCitations";

type Props = {
  summary?: string;
  children?: React.ReactNode;
  selectedCitationPosition?: number;
  onClickCitation?: (position: number) => void;
};

const decorateSummary = (
  summary: string,
  onClickCitation?: (position: number) => void,
  selectedCitationPosition?: number
) => {
  const citations = extractCitations(summary);
  return citations.reduce((accum, { text, references }, index) => {
    if (references) {
      accum.push(<span key={`text${index}`}>{text}</span>);

      const marginBefore = text ? text[text.length - 1] !== " " : false;
      if (marginBefore) {
        accum.push(<span key={`spaceBefore${index}`}> </span>);
      }

      references.forEach((reference, referenceIndex) => {
        if (referenceIndex > 0) {
          accum.push(<span key={`spaceInner${index}-${referenceIndex}`}> </span>);
        }

        const position = parseInt(reference, 10);
        accum.push(
          <VuiSummaryCitation
            marginBefore={false}
            marginAfter={false}
            onClick={() => onClickCitation && onClickCitation(position)}
            key={`${text}-${index}-${reference}-${referenceIndex}`}
            isSelected={selectedCitationPosition === position}
          >
            {reference}
          </VuiSummaryCitation>
        );

        const followingCitation = citations[index + 1];
        const marginAfter = ![",", ".", "!", "?", ":", ";"].includes(followingCitation?.text?.[0]);
        if (marginAfter) {
          accum.push(<span key={`spaceAfter${position}`}> </span>);
        }
      });
    } else {
      accum.push(<span key={`text${text}${index}`}>{text}</span>);
    }
    return accum;
  }, [] as JSX.Element[]);
};

export const VuiSummary = ({ summary, selectedCitationPosition, onClickCitation, children }: Props) => {
  let content;
  if (summary) {
    content = decorateSummary(summary, onClickCitation, selectedCitationPosition);
  } else {
    content = children;
  }

  return (
    <div className="vuiSummary">
      <VuiText size="m">{content}</VuiText>
    </div>
  );
};

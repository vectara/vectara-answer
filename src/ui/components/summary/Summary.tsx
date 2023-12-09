import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { extractCitations } from "../../utils/citations/extractCitations";
import { VuiText } from "../typography/Text";

const markDownCitations = (summary: string) => {
  const citations = extractCitations(summary);
  return citations
    .reduce((accum, { text, references }, index) => {
      if (references) {
        accum.push(text);

        const marginBefore = text ? text[text.length - 1] !== " " : false;
        if (marginBefore) {
          accum.push(" ");
        }

        references.forEach((reference, referenceIndex) => {
          if (referenceIndex > 0) {
            accum.push(" ");
          }

          accum.push(`<SummaryCitation reference={${reference}} />`);
        });
      } else {
        accum.push(text);
      }

      return accum;
    }, [] as string[])
    .join("");
};

type Props = {
  summary: string;
  className?: string;
  SummaryCitation: React.ComponentType<any>;
};

export const VuiSummary = ({ summary, className, SummaryCitation }: Props) => {
  // Protect users' privacy in FullStory.
  // https://help.fullstory.com/hc/en-us/articles/360020623574-How-do-I-protect-my-users-privacy-in-FullStory-#01F5DPW1AJHZHR8TBM9YQEDRMH
  const classes = classNames("vuiSummary", "fs-mask", className);
  const markdown = markDownCitations(summary);

  return (
    <div className={classes} dir="auto">
      <VuiText size="m">
        <Markdown
          children={markdown}
          options={{
            forceBlock: true,
            overrides: {
              SummaryCitation: {
                component: SummaryCitation
              }
            }
          }}
        />
      </VuiText>
    </div>
  );
};

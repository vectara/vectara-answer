import { forwardRef } from "react";
import classNames from "classnames";
import { VuiLink } from "../link/Link";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";

export type SearchResult = {
  title?: string;
  url?: string;
  date?: string;
  snippet: {
    pre: string;
    text: string;
    post: string;
  };
};

type Props = {
  result: SearchResult;
  className?: string;
};

const highlightUrl = (url: string, text: string) => `${url}#:~:text=${text}`;

export const VuiChatSearchResult = forwardRef<HTMLDivElement | null, Props>(
  ({ result, className, ...rest }: Props, ref) => {
    const {
      title,
      url,
      date,
      snippet: { pre, post, text }
    } = result;

    // Protect users' privacy in FullStory.
    // https://help.fullstory.com/hc/en-us/articles/360020623574-How-do-I-protect-my-users-privacy-in-FullStory-#01F5DPW1AJHZHR8TBM9YQEDRMH
    const classes = classNames("vuiChatSearchResult", "fs-mask", className);

    return (
      <div className={classes} ref={ref} {...rest}>
        {(title || url) && (
          <VuiText>
            {url ? (
              <VuiLink href={highlightUrl(url, text)} target="_blank">
                <p>{title ?? url}</p>
              </VuiLink>
            ) : (
              <p>{title}</p>
            )}
          </VuiText>
        )}

        <VuiText size="s">
          <p>
            {date && <VuiTextColor color="subdued">{date} &#8212; </VuiTextColor>}
            {pre} <strong>{text}</strong> {post}
          </p>
        </VuiText>
      </div>
    );
  }
);

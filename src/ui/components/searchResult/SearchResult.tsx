import { forwardRef } from "react";
import classNames from "classnames";
import { VuiTitle } from "../typography/Title";
import { VuiLink } from "../link/Link";
import { VuiSpacer } from "../spacer/Spacer";
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
  position: number;
  isSelected?: boolean;
  subTitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  snippetProps?: any;
};

const highlightUrl = (url: string, text: string) => `${url}#:~:text=${text}`;

export const VuiSearchResult = forwardRef<HTMLDivElement | null, Props>(
  ({ result, position, isSelected, subTitle, children, className, snippetProps, ...rest }: Props, ref) => {
    const {
      title,
      url,
      date,
      snippet: { pre, post, text }
    } = result;

    // Protect users' privacy in FullStory.
    // https://help.fullstory.com/hc/en-us/articles/360020623574-How-do-I-protect-my-users-privacy-in-FullStory-#01F5DPW1AJHZHR8TBM9YQEDRMH
    const classes = classNames("vuiSearchResult", "fs-mask", className);

    const positionClasses = classNames("vuiSearchResultPosition", {
      "vuiSearchResultPosition--selected": isSelected
    });

    const hasTitle = title && title.trim().length > 0;
    const hasUrl = url && url.trim().length > 0;

    return (
      <div className={classes} ref={ref} {...rest}>
        <div data-testid={`searchResultCitation-${position}`} className={positionClasses}>
          {position}
        </div>

        {(hasTitle || hasUrl) && (
          <VuiTitle size="s">
            {hasUrl ? (
              <VuiLink href={highlightUrl(url, text)} target="_blank">
                <h3>{hasTitle ? title : url}</h3>
              </VuiLink>
            ) : (
              <h3>{title}</h3>
            )}
          </VuiTitle>
        )}

        {subTitle && (
          <>
            {title && <VuiSpacer size="xs" />}
            {subTitle}
          </>
        )}

        <VuiText {...snippetProps} size="s">
          <p>
            {date && <VuiTextColor color="subdued">{date} &#8212; </VuiTextColor>}
            {pre} <strong>{text}</strong> {post}
          </p>
        </VuiText>

        {children && (
          <>
            <VuiSpacer size="s" />
            {children}
          </>
        )}
      </div>
    );
  }
);

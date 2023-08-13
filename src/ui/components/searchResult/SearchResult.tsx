import { forwardRef } from "react";
import classNames from "classnames";
import { VuiTitle } from "../typography/Title";
import { VuiLink } from "../link/Link";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { SearchGroupedResult } from "../../../views/search/types";

export type SearchResultType = {
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
  result: SearchGroupedResult;
  positions: Array<number>;
  isSelected?: boolean;
  subTitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  snippetProps?: any;
};

const highlightUrl = (url: string, text: string) => `${url}#:~:text=${text}`;

export const VuiSearchResult = forwardRef<HTMLDivElement | null, Props>(
  (
    {
      result,
      positions,
      isSelected,
      subTitle,
      children,
      className,
      snippetProps,
      ...rest
    }: Props,
    ref
  ) => {
    const { title, url, date } = result;
    const text = result.subresults[0].snippet.text; // Choose the first subresult's text for the href.

    const classes = classNames("vuiSearchResult", className);

    const positionClasses = classNames("vuiSearchResultPosition", {
      "vuiSearchResultPosition--selected": isSelected,
    });

    return (
      <div className={classes} ref={ref} {...rest}>
        <div className={positionClasses}>
          {positions.map((p) => p.toString()).join("\n")}
        </div>

        {(title || url) && (
          <VuiTitle size="s">
            {url ? (
              <VuiLink href={highlightUrl(url, text)} target="_blank">
                <h3>{title ?? url}</h3>
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

        {result.subresults.map((result, i) => (
          <div key={i}>
            <VuiSpacer size="xs" />
            <VuiText {...snippetProps} size="s">
              <p>
                {date && (
                  <VuiTextColor color="subdued">{date} &#8212; </VuiTextColor>
                )}
                {result.snippet.pre}
                <strong>
                  <a
                    href={highlightUrl(url, result.snippet.text)}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {result.snippet.text}
                  </a>
                </strong>
                {result.snippet.post}
              </p>
            </VuiText>
          </div>
        ))}

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

import { forwardRef } from "react";
import classNames from "classnames";
import { VuiTitle } from "../typography/Title";
import { VuiLink } from "../link/Link";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";

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
  result: SearchResultType;
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

    const classes = classNames("vuiSearchResult", className);

    const positionClasses = classNames("vuiSearchResultPosition", {
      "vuiSearchResultPosition--selected": isSelected
    });

    return (
      <div className={classes} ref={ref} {...rest}>
        <div className={positionClasses}>{position}</div>

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

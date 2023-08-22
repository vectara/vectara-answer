import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiLinkInternal } from "../link/Link";
import { VuiBadge } from "../badge/Badge";
import { VuiToggle } from "../toggle/Toggle";

type Props = {
  title: string;
  label: string;
  badge?: string;
  helpUrl?: string;
  description?: React.ReactNode;
  isEnabled?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
};

export const VuiSetting = ({
  title,
  label,
  badge,
  helpUrl,
  description,
  isEnabled,
  onToggle,
  children,
  ...rest
}: Props) => {
  return (
    <>
      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={false}>
          <VuiFlexContainer alignItems="center" spacing="xs">
            <VuiFlexItem grow={false}>
              <VuiText size="m">
                <p>{title}</p>
              </VuiText>
            </VuiFlexItem>

            {badge && (
              <VuiFlexItem grow={false}>
                <VuiBadge color="neutral">{badge}</VuiBadge>
              </VuiFlexItem>
            )}
          </VuiFlexContainer>
        </VuiFlexItem>

        {helpUrl && (
          <VuiFlexItem grow={false}>
            <VuiText size="s">
              <p>
                <VuiLinkInternal href={helpUrl} target="_blank">
                  Learn more
                </VuiLinkInternal>
              </p>
            </VuiText>
          </VuiFlexItem>
        )}
      </VuiFlexContainer>

      {description && (
        <>
          <VuiSpacer size="xxs" />
          <VuiText>
            <VuiTextColor color="subdued">
              <p>{description}</p>
            </VuiTextColor>
          </VuiText>
        </>
      )}

      <VuiSpacer size="xs" />

      <VuiToggle {...rest} checked={isEnabled} label={label} onChange={onToggle} />

      {isEnabled && children && (
        <>
          <VuiSpacer size="s" />
          {children}
        </>
      )}
    </>
  );
};

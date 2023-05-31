import { cloneElement } from "react";
import { VuiLabel } from "../form/label/Label";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";

type Props = {
  labelFor: string;
  label: string;
  children: React.ReactElement;
  helpText?: React.ReactNode;
};

export const VuiFormGroup = ({ children, labelFor, helpText, label }: Props) => {
  const ariaProps: Record<string, string> = {};

  if (helpText) {
    ariaProps["aria-describedby"] = `${label}-help`;
  }

  const content = cloneElement(children, {
    ...ariaProps
  });

  return (
    <>
      <VuiLabel labelFor={labelFor}>{label}</VuiLabel>

      <VuiSpacer size="xs" />

      {content}

      {helpText && (
        <>
          <VuiSpacer size="xs" />

          <VuiText size="xs" id={`${label}-help`}>
            <p>
              <VuiTextColor color="subdued">{helpText}</VuiTextColor>
            </p>
          </VuiText>
        </>
      )}
    </>
  );
};

import { cloneElement } from "react";
import { VuiLabel } from "../form/label/Label";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { createId } from "../../utils/createId";

type Props = {
  labelFor: string;
  label: string;
  children: React.ReactElement;
  helpText?: React.ReactNode;
  errors?: string[];
  isRequired?: boolean;
};

export const VuiFormGroup = ({ children, labelFor, helpText, label, errors, isRequired }: Props) => {
  const ariaProps: Record<string, string> = {
    "aria-describedby": ""
  };

  const ariaDescribedByLabel = `help-${createId()}`;

  const errorMessageIds: string[] = [];

  const errorMessages = errors?.map((error, index) => {
    const id = `error-${createId()}`;
    errorMessageIds.push(id);

    return (
      <>
        {index > 0 && <VuiSpacer size="xs" />}

        <VuiText size="xs" key={error} id={id}>
          <p>
            <VuiTextColor color="danger">{error}</VuiTextColor>
          </p>
        </VuiText>
      </>
    );
  });

  if (helpText) {
    ariaProps["aria-describedby"] += ariaDescribedByLabel;
  }

  if (errorMessages?.length) {
    ariaProps["aria-describedby"] += " " + errorMessageIds.join(" ");
  }

  const content = cloneElement(children, {
    ...ariaProps,
    isInvalid: errors && errors.length > 0,
    id: labelFor,
    required: isRequired
  });

  return (
    <>
      <VuiLabel labelFor={labelFor}>
        {label}
        {isRequired && " (required)"}
      </VuiLabel>

      <VuiSpacer size="xs" />

      {content}

      {(helpText || errorMessages) && <VuiSpacer size="xs" />}

      {helpText && (
        <VuiText size="xs" id={ariaDescribedByLabel}>
          <p>
            <VuiTextColor color="subdued">{helpText}</VuiTextColor>
          </p>
        </VuiText>
      )}

      {errorMessages}
    </>
  );
};

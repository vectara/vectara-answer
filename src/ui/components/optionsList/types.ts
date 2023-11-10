import { ReactElement } from "react";
import { TextColor } from "../typography/types";

// Value could be undefined, but the consumer is the one
// providing them. We use a generic type to enable
// consumers to disregard the possibility of undefined values
// in onClick if they know they won't be providing any.
export type OptionListItem<T> = {
  value: T;
  label: string;
  icon?: ReactElement | null;
  href?: string;
  target?: string;
  onClick?: (value: T) => void;
  color?: TextColor;
  testId?: string;
};

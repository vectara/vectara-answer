export type RadioButtonConfig = {
  label: React.ReactNode;
  description?: React.ReactNode;
  value: string;
  checked: boolean;
  disabled?: boolean;
  "data-testid"?: string;
};

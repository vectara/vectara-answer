import classNames from "classnames";

const PADDING = ["xxs", "xs", "s"] as const;

export type InfoTableColumnAlign = "left" | "right";

type Column = {
  name: string;
  render?: React.ReactNode;
  width?: string;
  align?: InfoTableColumnAlign;
};

export type InfoTableRowType = "sectionHeader" | "footer";

export type InfoTableRow = {
  type?: InfoTableRowType;
  values: Record<
    string,
    | {
        render: React.ReactNode;
        colSpan?: number;
      }
    | undefined
  >;
};

type Props = {
  columns: Column[];
  rows: InfoTableRow[];
  isHeaderVisible?: boolean;
  padding?: (typeof PADDING)[number];
};

const paddingToClassMap = {
  xxs: "vuiInfoTable--paddingXxs",
  xs: "vuiInfoTable--paddingXs",
  s: "vuiInfoTable--paddingS"
};

const typeToRowClassMap = {
  sectionHeader: "vuiInfoTableRow--sectionHeader",
  footer: "vuiInfoTableRow--footer"
};

export const VuiInfoTable = ({ columns, rows, isHeaderVisible, padding = "xs" }: Props) => {
  const classes = classNames("vuiInfoTable", paddingToClassMap[padding]);

  return (
    <table className={classes}>
      {isHeaderVisible && (
        <thead>
          <tr>
            {columns.map(({ name, render, width, align }) => (
              <th key={name} style={{ width, textAlign: align ?? "left" }}>
                {render}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {rows.map(({ values, type }, index) => {
          const rowClasses = type && typeToRowClassMap[type];
          return (
            <tr key={index} className={rowClasses}>
              {columns.map(({ name, width, align }) => {
                const value = values[name];
                if (value !== undefined) {
                  return (
                    <td key={name} style={{ width, textAlign: align ?? "left" }} colSpan={value.colSpan}>
                      {value.render}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

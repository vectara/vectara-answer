import React, { useState } from "react";
import classNames from "classnames";
import { get } from "lodash";
import { VuiCheckbox, VuiTextInput } from "../form";
import { VuiSpacer } from "../spacer/Spacer";
import { Props as TableRowActionsProps, VuiTableRowActions } from "./TableRowActions";
import { VuiTableCell } from "./TableCell";
import { Props as TableHeaderCellProps, VuiTableHeaderCell } from "./TableHeaderCell";
import { Pagination, VuiTablePagination } from "./TablePagination";
import { Pager, VuiTablePager } from "./TablePager";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiText } from "../typography/Text";
import { Props as TableBulkActionProps, VuiTableBulkActions } from "./TableBulkActions";
import { VuiSpinner } from "../spinner/Spinner";
import { VuiTableContent } from "./TableContent";
import { VuiButtonSecondary } from "../button/ButtonSecondary";
import { Row } from "./types";

// Type guard to determine type of pagination.
const isComplexPagination = (pagination: Pagination | Pager): pagination is Pagination => {
  return (pagination as Pagination).onSelectPage !== undefined;
};

type Column<T> = {
  name: string;
  width?: string;
  header: TableHeaderCellProps["header"];
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  isLoading?: boolean;
  idField: string | ((row: T) => string);
  columns: Column<T>[];
  rows: T[];
  actions?: TableRowActionsProps<T>["actions"];
  actionsTestIdProvider?: (row: T) => string;
  pagination?: Pagination | Pager;
  selection?: Selection<T>;
  search?: Search;
  onSort?: TableHeaderCellProps["onSort"];
  onReload?: () => void;
  content?: React.ReactNode;
  className?: string;
  fluid?: boolean;
};

type Selection<T> = {
  bulkActions?: TableBulkActionProps<T[]>["actions"];
  onSelectRow?: (selectedRows: T[]) => void;
  selectedRows?: T[];
};

type Search = {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  "data-testid"?: string;
};

const extractId = (row: Record<string, any>, idField: Props<any>["idField"]) => {
  if (typeof idField === "string") {
    return get(row, idField);
  }

  return idField(row);
};

// https://github.com/typescript-eslint/typescript-eslint/issues/4062
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const VuiTable = <T extends Row>({
  isLoading,
  idField,
  columns,
  rows,
  actions,
  actionsTestIdProvider,
  pagination,
  selection,
  search,
  onSort,
  onReload,
  content,
  className,
  fluid,
  ...rest
}: Props<T>) => {
  const [rowBeingActedUpon, setRowBeingActedUpon] = useState<T | undefined>(undefined);

  const { bulkActions, onSelectRow, selectedRows } = selection || {};
  const { searchValue, searchPlaceholder, onSearchChange } = search || {};

  const isEmpty = !isLoading && rows.length === 0;
  // The user interacts with the table rows by selecting them or performing actions on them.
  // This is only allowed if there is no “content” (which is an error or similar state that
  // replaces the rows), and if it’s not in a loading state or empty state.
  const isInteractive = Boolean(!content && !isLoading && !isEmpty);

  const allRowsSelected = selectedRows?.length === rows.length;
  const selectedIds: Record<string, boolean> =
    selectedRows?.reduce((acc, row) => {
      acc[extractId(row, idField)] = true;
      return acc;
    }, {} as Record<string, boolean>) || {};

  const hasSearch = searchValue !== undefined && onSearchChange;
  const hasBulkActions = bulkActions !== undefined;
  const columnCount = columns.length + (onSelectRow ? 1 : 0) + (actions ? 1 : 0);

  const classes = classNames(
    "vuiTable",
    {
      "vuiTable--fluid": fluid
    },
    className
  );

  let tableContent;

  if (content) {
    tableContent = <VuiTableContent colSpan={columnCount}>{content}</VuiTableContent>;
  } else if (isLoading) {
    tableContent = (
      <VuiTableContent colSpan={columnCount}>
        <VuiFlexItem grow={false}>
          <VuiSpinner size="xs" />
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiText>
            <p>Loading</p>
          </VuiText>
        </VuiFlexItem>
      </VuiTableContent>
    );
  } else if (searchValue && isEmpty) {
    tableContent = (
      <VuiTableContent colSpan={columnCount}>
        <VuiFlexItem grow={false}>
          <VuiText>
            <p>No matches found</p>
          </VuiText>
        </VuiFlexItem>
      </VuiTableContent>
    );
  } else {
    tableContent = rows.map((row) => {
      const rowId = extractId(row, idField);
      return (
        <tr key={rowId} className={rowBeingActedUpon === row ? "vuiTableRow-isBeingActedUpon" : undefined}>
          {/* Checkbox column */}
          {onSelectRow && (
            <td>
              <VuiTableCell>
                <VuiCheckbox
                  checked={selectedIds[rowId] ?? false}
                  onChange={() => {
                    if (selectedIds[rowId]) {
                      delete selectedIds[rowId];
                    } else {
                      selectedIds[rowId] = true;
                    }

                    const selectedRowIds = Object.keys(selectedIds);
                    // Map selected row IDs to selected rows.
                    const selectedRows = selectedRowIds.map((id) => rows.find((row) => row.id === id) as T);
                    onSelectRow(selectedRows);
                  }}
                />
              </VuiTableCell>
            </td>
          )}

          {/* Row info */}
          {columns.map((column) => {
            const { name, render, className } = column;

            return (
              <td key={name} className={className}>
                <VuiTableCell>{render ? render(row) : row[column.name]}</VuiTableCell>
              </td>
            );
          })}

          {/* Actions column */}
          {actions && (
            <td>
              <VuiTableRowActions
                row={row}
                actions={actions}
                onToggle={(isSelected: boolean) => {
                  if (isSelected) {
                    setRowBeingActedUpon(row);
                  } else {
                    setRowBeingActedUpon(undefined);
                  }
                }}
                testId={actionsTestIdProvider?.(row) ?? undefined}
              />
            </td>
          )}
        </tr>
      );
    });
  }

  return (
    <>
      {(hasSearch || (hasBulkActions && selectedRows && selectedRows.length > 0) || Boolean(onReload)) && (
        <>
          <VuiFlexContainer spacing="s" justifyContent="spaceBetween" alignItems="center">
            {/* Bulk actions */}
            {selectedRows && selectedRows.length > 0 && hasBulkActions && (
              <VuiFlexItem grow={false} shrink={false}>
                <VuiTableBulkActions selectedRows={selectedRows} actions={bulkActions} />
              </VuiFlexItem>
            )}

            {/* Search */}
            {hasSearch && (
              <VuiFlexItem grow={1} shrink={false}>
                <VuiTextInput
                  placeholder={searchPlaceholder}
                  fullWidth
                  value={searchValue}
                  onChange={(event) => onSearchChange(event.target.value)}
                  data-testid={search?.["data-testid"]}
                />
              </VuiFlexItem>
            )}

            {/* Reload */}
            {onReload && (
              <VuiFlexItem grow={false} shrink={false}>
                <VuiButtonSecondary color="neutral" onClick={() => onReload()}>
                  Reload
                </VuiButtonSecondary>
              </VuiFlexItem>
            )}
          </VuiFlexContainer>

          <VuiSpacer size="s" />
        </>
      )}

      <table className={classes} {...rest}>
        <thead>
          <tr>
            {/* Checkbox column */}
            {onSelectRow && (
              <th className="vuiTableHeaderSelect">
                <VuiTableCell>
                  <VuiCheckbox
                    disabled={!isInteractive}
                    checked={isInteractive ? allRowsSelected : false}
                    onChange={() => {
                      let newSelectedRows: T[];

                      if (allRowsSelected) {
                        newSelectedRows = [];
                      } else {
                        newSelectedRows = rows.reduce((acc, row) => {
                          acc.push(row);
                          return acc;
                        }, [] as T[]);
                      }

                      onSelectRow(newSelectedRows);
                    }}
                  />
                </VuiTableCell>
              </th>
            )}

            {/* Row info */}
            {columns.map((column) => {
              const { name, header, width } = column;
              const styles = width ? { width } : undefined;

              return (
                <th key={name} style={styles}>
                  <VuiTableHeaderCell name={name} header={header} onSort={onSort} />
                </th>
              );
            })}

            {/* Actions column */}
            {actions && <th className="vuiTableHeaderActions" />}
          </tr>
        </thead>

        <tbody>{tableContent}</tbody>
      </table>

      {/* Pagination */}
      {!pagination ? undefined : isComplexPagination(pagination) ? (
        <>
          <VuiSpacer size="xs" />
          <VuiTablePagination isDisabled={!isInteractive} {...pagination} />
        </>
      ) : (
        <>
          <VuiSpacer size="xs" />
          <VuiTablePager isDisabled={!isInteractive} {...pagination} />
        </>
      )}
    </>
  );
};

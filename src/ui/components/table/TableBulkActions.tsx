import { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { VuiOptionsList } from "../optionsList/OptionsList";
import { VuiPopover } from "../popover/Popover";
import { VuiIcon } from "../icon/Icon";
import { VuiButtonSecondary } from "../button/ButtonSecondary";
import { Action } from "./TableRowActions";
import { Row } from "./types";

export type Props<T> = {
  selectedRows: any;
  actions: Action<T>[];
};

export const VuiTableBulkActions = <T extends Row>({ selectedRows, actions }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  let content;

  if (actions.length === 1) {
    content = (
      <VuiButtonSecondary
        color="neutral"
        size="m"
        onClick={() => actions[0].onClick && actions[0].onClick(selectedRows)}
      >
        {actions[0].label}
      </VuiButtonSecondary>
    );
  } else {
    content = (
      <VuiPopover
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(!isOpen)}
        button={
          <VuiButtonSecondary
            color="neutral"
            size="m"
            icon={
              <VuiIcon>
                <BiCaretDown />
              </VuiIcon>
            }
          >
            {selectedRows.length} selected
          </VuiButtonSecondary>
        }
      >
        <VuiOptionsList
          onSelectOption={() => {
            setIsOpen(false);
          }}
          options={actions.map(({ href, ...action }) => ({
            ...action,
            href: href?.(selectedRows),
            value: selectedRows
          }))}
          size="m"
        />
      </VuiPopover>
    );
  }

  return content;
};

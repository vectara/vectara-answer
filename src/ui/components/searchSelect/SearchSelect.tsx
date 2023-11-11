import { useEffect, useState } from "react";
import { Props as OptionsListProps, VuiOptionsList } from "../optionsList/OptionsList";
import { Props as PopoverProps, VuiPopover } from "../popover/Popover";
import { OptionListItem } from "../optionsList/types";
import { VuiTextInput } from "../form";
import { VuiSpacer } from "../spacer/Spacer";

type Props<T> = Pick<PopoverProps, "isOpen" | "setIsOpen"> &
  Pick<OptionsListProps<T>, "options"> & {
    children: PopoverProps["button"];
    title?: string;
    selected: T[];
    onSelect: (selected: T[]) => void;
    isMultiSelect?: boolean;
  };

// https://github.com/typescript-eslint/typescript-eslint/issues/4062
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const VuiSearchSelect = <T extends unknown = unknown>({
  children,
  title,
  isOpen,
  setIsOpen,
  options,
  onSelect,
  isMultiSelect = true,
  selected = []
}: Props<T>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<T[]>();
  const [orderedOptions, setOrderedOptions] = useState<OptionListItem<T>[]>([]);

  useEffect(() => {
    // When the popover is opened, initialize the selected options,
    // and sort the options so the selected ones are on top.
    if (isOpen) {
      const selectedOptionsCopy = selected.concat();
      setSelectedOptions(selectedOptionsCopy);

      const sortedOptions = options.concat().sort((first, second) => {
        const isFirstSelected = selectedOptionsCopy.includes(first.value);
        const isSecondSelected = selectedOptionsCopy.includes(second.value);
        if (isFirstSelected && !isSecondSelected) {
          return -1;
        }

        if (!isFirstSelected && isSecondSelected) {
          return 1;
        }

        return 0;
      });

      setOrderedOptions(sortedOptions);
    }
  }, [isOpen]);

  const updateOpen = () => {
    if (isOpen) {
      // When the popover is closed, notify the consumer of the
      // selected options.
      onSelect(selectedOptions ?? []);

      // Signal the popover to be closed. We don't depend on the
      // original isOpen because it will cause a flicker when the
      // options are sorted.
      setSelectedOptions(undefined);
    }

    setIsOpen(!isOpen);
  };

  const onSelectOption = (value: T) => {
    if (isMultiSelect) {
      setSelectedOptions((prev) => {
        if (!prev) return [];

        const updated = prev.concat();
        const index = prev.findIndex((item) => item === value);

        if (index !== -1) {
          updated.splice(index, 1);
          return updated;
        }

        updated.push(value);
        return updated;
      });

      return;
    }

    // If the user can only select one option at a time,
    // close the search select as soon as they make a choice.
    onSelect([value]);

    // Signal the popover to be closed. We don't depend on the
    // original isOpen because it will cause a flicker when the
    // options are sorted.
    setSelectedOptions(undefined);
    setIsOpen(false);
  };

  const visibleOptions = orderedOptions.filter((option) => {
    if (!searchValue.trim()) return true;
    if (option.label.toLowerCase().includes(searchValue.toLowerCase())) return true;
    return false;
  });

  return (
    <VuiPopover isOpen={selectedOptions !== undefined} setIsOpen={updateOpen} button={children} header={title}>
      <div className="vuiSearchSelect__search">
        <VuiTextInput
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <VuiSpacer size="xxs" />
      </div>

      <VuiOptionsList
        isSelectable
        isScrollable
        onSelectOption={onSelectOption}
        selected={selectedOptions}
        options={visibleOptions}
      />
    </VuiPopover>
  );
};

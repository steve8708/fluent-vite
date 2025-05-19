import React, { useState, useCallback } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
  IObjectWithKey,
  DetailsRow,
  IDetailsRowProps,
  DetailsRowCheck,
  CheckboxVisibility,
  SearchBox,
  ISearchBoxStyles,
  getTheme,
} from "@fluentui/react";
import { useTheme as useFluentTheme } from "../../theme/ThemeProvider";

interface IUserTableProps<T> {
  items: T[];
  columns: IColumn[];
  selectionMode?: SelectionMode;
  onItemInvoked?: (item: T) => void;
  onSelectionChanged?: (selectedItems: T[]) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

function UserTable<T extends IObjectWithKey>({
  items,
  columns,
  selectionMode = SelectionMode.single,
  onItemInvoked,
  onSelectionChanged,
  showSearch = false,
  searchPlaceholder = "Search items...",
  className,
}: IUserTableProps<T>) {
  const { themeMode } = useFluentTheme();
  const isDark = themeMode === "dark";
  const fluentTheme = getTheme();

  const [searchText, setSearchText] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  // Create selection manager
  const selection = new Selection({
    onSelectionChanged: () => {
      if (onSelectionChanged) {
        const selectedItems = selection.getSelection() as T[];
        onSelectionChanged(selectedItems);
      }
    },
  });

  React.useEffect(() => {
    // Update filtered items when original items change
    handleSearch(searchText);
  }, [items]);

  const handleSearch = useCallback(
    (newValue?: string) => {
      const searchValue = newValue !== undefined ? newValue : searchText;
      setSearchText(searchValue);

      if (!searchValue) {
        setFilteredItems(items);
        return;
      }

      // This is a simple search implementation
      // In a real application, you might want to use a more sophisticated approach
      const filtered = items.filter((item) => {
        // Search across all string properties
        return Object.values(item as object).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          } else if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            // Search nested objects (one level deep)
            return Object.values(value).some(
              (nestedValue) =>
                typeof nestedValue === "string" &&
                nestedValue.toLowerCase().includes(searchValue.toLowerCase()),
            );
          }
          return false;
        });
      });

      setFilteredItems(filtered);
    },
    [items, searchText],
  );

  // Custom row rendering to support dark mode
  const onRenderRow = (props?: IDetailsRowProps): JSX.Element | null => {
    if (!props) return null;

    return (
      <DetailsRow
        {...props}
        styles={{
          root: {
            backgroundColor: isDark
              ? fluentTheme.palette.neutralLighter
              : fluentTheme.palette.white,
            selectors: {
              "&:hover": {
                backgroundColor: isDark
                  ? fluentTheme.palette.neutralLight
                  : fluentTheme.palette.neutralLighter,
              },
              "&.is-selected": {
                backgroundColor: isDark
                  ? fluentTheme.palette.neutralQuaternaryAlt
                  : fluentTheme.palette.neutralLighter,
                selectors: {
                  "&:hover": {
                    backgroundColor: isDark
                      ? fluentTheme.palette.neutralQuaternary
                      : fluentTheme.palette.neutralLight,
                  },
                },
              },
            },
          },
          cell: {
            color: isDark
              ? fluentTheme.palette.white
              : fluentTheme.palette.neutralPrimary,
          },
        }}
      />
    );
  };

  // Custom check rendering to support dark mode
  const onRenderDetailsCheckbox = (
    props?: IDetailsRowProps,
  ): JSX.Element | null => {
    if (!props) return null;

    return (
      <DetailsRowCheck
        {...props}
        styles={{
          check: {
            color: isDark
              ? fluentTheme.palette.white
              : fluentTheme.palette.neutralPrimary,
          },
        }}
      />
    );
  };

  const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
      width: 300,
      marginBottom: 16,
      backgroundColor: isDark
        ? fluentTheme.palette.neutralLighter
        : fluentTheme.palette.white,
      borderColor: fluentTheme.palette.neutralTertiary,
    },
    icon: {
      color: isDark
        ? fluentTheme.palette.neutralPrimary
        : fluentTheme.palette.neutralSecondary,
    },
  };

  return (
    <div className={className}>
      {showSearch && (
        <SearchBox
          placeholder={searchPlaceholder}
          onChange={(_, newValue) => handleSearch(newValue)}
          styles={searchBoxStyles}
          value={searchText}
        />
      )}

      <DetailsList
        items={filteredItems}
        columns={columns}
        selectionMode={selectionMode}
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection}
        selectionPreservedOnEmptyClick={true}
        onItemInvoked={onItemInvoked}
        checkboxVisibility={
          selectionMode === SelectionMode.none
            ? CheckboxVisibility.hidden
            : CheckboxVisibility.always
        }
        onRenderRow={onRenderRow}
        onRenderDetailsCheckbox={onRenderDetailsCheckbox}
        styles={{
          root: {
            backgroundColor: isDark
              ? fluentTheme.palette.neutralLighter
              : fluentTheme.palette.white,
            selectors: {
              ".ms-DetailsHeader": {
                backgroundColor: isDark
                  ? fluentTheme.palette.neutralLight
                  : fluentTheme.palette.neutralLighter,
              },
              ".ms-DetailsHeader-cell": {
                color: isDark
                  ? fluentTheme.palette.white
                  : fluentTheme.palette.neutralPrimary,
                selectors: {
                  "&:hover": {
                    backgroundColor: isDark
                      ? fluentTheme.palette.neutralQuaternary
                      : fluentTheme.palette.neutralLight,
                  },
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default UserTable;

import { Button, ButtonContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFilter, IconX } from "@tabler/icons-react"
import type { Table } from "@tanstack/react-table"
import { InputDebounced } from "../../inputs/inputDebounced.js"
import { InputText } from "../../inputs/inputText.js"
import { Popover } from "../../overlays/popover/popover.js"

export function TableFilterPopover<TData>(props: { table: Table<TData> }) {
    const filterableColumns = props.table
        .getAllColumns()
        .filter((column) => column.getCanFilter() && column.columnDef.header && column.columnDef.header !== " ")

    if (filterableColumns.length === 0) return null

    const activeFilterCount = filterableColumns.filter((column) => column.getFilterValue() !== undefined).length

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <ButtonContent
                        variant={activeFilterCount > 0 ? "primary" : "default"}
                        leftIcon={<IconFilter size={16} />}
                        text={activeFilterCount > 0 ? `Filtrer (${activeFilterCount})` : "Filtrer"}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={css({
                    width: "280px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    padding: "0.5rem",
                })}
            >
                <Button
                    onClick={() => {
                        for (const column of filterableColumns) {
                            column.setFilterValue(undefined)
                        }
                    }}
                    className={css({ width: "100%" })}
                    isDisabled={activeFilterCount === 0}
                >
                    <ButtonContent
                        variant="invisible"
                        color="error"
                        leftIcon={<IconX size={16} />}
                        text="Effacer les filtres"
                        className={css({ width: "100%", justifyContent: "start" })}
                        isDisabled={activeFilterCount === 0}
                    />
                </Button>
                <Separator />
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {filterableColumns.map((column) => (
                        <div
                            key={column.id}
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "xs",
                                    fontWeight: "medium",
                                    textTransform: "uppercase",
                                    color: "neutral/50",
                                })}
                            >
                                {column.columnDef.header?.toString()}
                            </span>
                            <InputDebounced
                                value={(column.getFilterValue() as string) ?? ""}
                                onChange={(value) => column.setFilterValue(value || undefined)}
                            >
                                <InputText
                                    placeholder={`Filtrer par ${column.columnDef.header?.toString().toLowerCase()}`}
                                />
                            </InputDebounced>
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}

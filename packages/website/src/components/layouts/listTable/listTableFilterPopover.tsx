import { Button, ButtonContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFilter, IconX } from "@tabler/icons-react"
import { InputDebounced } from "../../inputs/inputDebounced.js"
import { InputText } from "../../inputs/inputText.js"
import { Popover } from "../../overlays/popover/popover.js"
import type { ListTableColumn } from "./listTableFilterable.js"

export function ListTableFilterPopover<TItem>(props: {
    columns: Array<ListTableColumn<TItem>>
    columnFilters: Record<string, string>
    onFilterChange: (columnId: string, value: string | undefined) => void
    onClearAll: () => void
}) {
    const activeFilterCount = Object.values(props.columnFilters).filter(Boolean).length

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
                    onClick={props.onClearAll}
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
                    {props.columns.map((column) => (
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
                                {column.header}
                            </span>
                            <InputDebounced
                                value={props.columnFilters[column.id] ?? ""}
                                onChange={(value) => props.onFilterChange(column.id, value || undefined)}
                            >
                                <InputText placeholder={`Filtrer par ${column.header.toLowerCase()}`} />
                            </InputDebounced>
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}

import { Button, ButtonContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowsSort, IconSortAscendingLetters, IconSortDescendingLetters, IconX } from "@tabler/icons-react"
import type { SortDirection, Table } from "@tanstack/react-table"
import { Popover } from "../../overlays/popover/popover.js"

export function TableSortPopover<TData>(props: { table: Table<TData> }) {
    const sortableColumns = props.table
        .getAllColumns()
        .filter((column) => column.getCanSort() && column.columnDef.header && column.columnDef.header !== " ")

    if (sortableColumns.length === 0) return null

    const sorting = props.table.getState().sorting
    const activeSortCount = sorting.length

    function toggleColumnSort(columnId: string) {
        const existing = sorting.find((s) => s.id === columnId)
        if (!existing) {
            props.table.setSorting([...sorting, { id: columnId, desc: false }])
        } else if (!existing.desc) {
            props.table.setSorting(sorting.map((s) => (s.id === columnId ? { ...s, desc: true } : s)))
        } else {
            props.table.setSorting(sorting.filter((s) => s.id !== columnId))
        }
    }

    function getSortDirection(columnId: string): SortDirection | false {
        const existing = sorting.find((s) => s.id === columnId)
        if (!existing) return false
        return existing.desc ? "desc" : "asc"
    }

    function getSortIcon(direction: SortDirection | false) {
        if (direction === "asc") return <IconSortAscendingLetters size={16} />
        if (direction === "desc") return <IconSortDescendingLetters size={16} />
        return undefined
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <ButtonContent
                        variant={activeSortCount > 0 ? "primary" : "default"}
                        leftIcon={<IconArrowsSort size={16} />}
                        text={activeSortCount > 0 ? `Trier (${activeSortCount})` : "Trier"}
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
                    onClick={() => props.table.setSorting([])}
                    className={css({ width: "100%" })}
                    isDisabled={activeSortCount === 0}
                >
                    <ButtonContent
                        variant="invisible"
                        color="error"
                        leftIcon={<IconX size={16} />}
                        text="Effacer le tri"
                        className={css({ width: "100%", justifyContent: "start" })}
                        isDisabled={activeSortCount === 0}
                    />
                </Button>
                <Separator />
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                    })}
                >
                    {sortableColumns.map((column) => {
                        const direction = getSortDirection(column.id)
                        return (
                            <div
                                key={column.id}
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem",
                                })}
                            >
                                <Button onClick={() => toggleColumnSort(column.id)} className={css({ width: "100%" })}>
                                    <ButtonContent
                                        variant="invisible"
                                        leftIcon={getSortIcon(direction)}
                                        text={column.columnDef.header?.toString()}
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}

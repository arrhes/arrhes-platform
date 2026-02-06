import { Button } from "@arrhes/ui"
import { FormatNull } from "../../components/formats/formatNull.js"
import { InputDebounced } from "../../components/inputs/inputDebounced.js"
import { InputText } from "../../components/inputs/inputText.js"
import { CircularLoader } from "../../components/layouts/circularLoader.js"
import { css, cx } from "../../utilities/cn.js"
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import {
    ColumnDef,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { ReactElement, useMemo, useState } from "react"


export function DataTable<TData extends Record<keyof TData, unknown>>(props: {
    children?: ReactElement | null
    data: Array<TData>
    isLoading?: boolean
    columns: Array<ColumnDef<TData>>
    onRowClick?: (context: Row<TData>) => void
}) {

    const memoizedData = useMemo(() => props.data, [props.data])
    const [globalFilter, setGlobalFilter] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable<TData>({
        data: memoizedData,
        columns: props.columns.map((column) => ({
            ...column,
            enableMultiSort: true
        })),
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        enableMultiSort: true,
        state: {
            globalFilter,
            sorting,
        }
    })

    if (props.isLoading) return <CircularLoader className={css({ m: "3" })} />
    return (
        <div className={css({
            flexShrink: "0",
            w: "full",
            h: "fit",
            display: "flex",
            flexDir: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: "3"
        })}>
            <div className={css({
                flexShrink: "0",
                w: "full",
                h: "fit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "4"
            })}>
                <InputDebounced
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(value)}
                >
                    <InputText
                        placeholder="Recherche"
                        className={css({ maxW: "320px" })}
                    />
                </InputDebounced>
                <div className={css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "2"
                })}>
                    {props.children ?? null}
                </div>
            </div>
            <div className={css({
                w: "full",
                maxW: "full",
                maxH: "600px",
                p: "0",
                display: "flex",
                flexDir: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                overflow: "auto",
                rounded: "md",
                border: "1px solid",
                borderColor: "neutral/10"
            })}>
                <table className={css({
                    w: "full",
                    maxW: "full",
                    h: "full",
                    maxH: "full",
                    borderCollapse: "collapse"
                })}>
                    <thead className={css({
                        w: "full",
                        position: "sticky",
                        top: "0",
                        bg: "white"
                    })}>
                        <tr className={css({ w: "full" })}>
                            {table.getFlatHeaders().map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={css({ w: "fit" })}
                                    >
                                        <div className={css({
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "2",
                                            p: "2",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/10",
                                            borderTop: "2px solid",
                                            borderTopColor: "white"
                                        })}>
                                            <Button
                                                variant="invisible"
                                                onClick={header.column.getToggleSortingHandler()}
                                                icon={{
                                                    asc: <IconSortAscending size={16} />,
                                                    desc: <IconSortDescending size={16} />,
                                                }[String(header.column.getIsSorted())] ?? undefined}
                                                text={header.column.columnDef.header?.toString()}
                                            />
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className={css({
                        w: "full",
                        h: "fit"
                    })}>
                        {
                            table.getRowModel().rows.length > 0
                                ? (null)
                                : (
                                    <tr>
                                        <td>
                                            <FormatNull
                                                text="Pas de données"
                                                className={css({ p: "2" })}
                                            />
                                        </td>
                                    </tr>
                                )
                        }
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        if (!props.onRowClick) return
                                        props.onRowClick(row)
                                    }}
                                    className={cx(
                                        css({
                                            w: "full",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/5",
                                            _last: { borderBottom: "0" }
                                        }),
                                        !props.onRowClick ? undefined : css({
                                            cursor: "pointer",
                                            _hover: { bg: "neutral/5" }
                                        })
                                    )}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className={css({
                                                w: "fit",
                                                _last: { w: "1%" }
                                            })}>
                                                <div className={css({
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    p: "2"
                                                })}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

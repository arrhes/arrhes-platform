import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { InputDebounced } from "#/components/inputs/inputDebounced.js"
import { InputText } from "#/components/inputs/inputText.js"
import { CircularLoader } from "#/components/layouts/circularLoader.js"
import { cn } from "#/utilities/cn.js"
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


export function DataTable<TData extends Record<string, unknown>>(props: {
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

    if (props.isLoading) return <CircularLoader className="m-3" />
    return (
        <div className="shrink-0 w-full h-fit flex flex-col justify-start items-stretch gap-3">
            <div className="shrink-0 w-full h-fit flex justify-between items-start gap-4">
                <InputDebounced
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(value)}
                >
                    <InputText
                        placeholder="Recherche"
                        className="max-w-[320px]"
                    />
                </InputDebounced>
                <div className="flex justify-start items-center gap-2">
                    {props.children ?? null}
                </div>
            </div>
            <div className="w-full max-w-full max-h-[600px] p-0 flex flex-col justify-start items-stretch overflow-auto rounded-md border border-neutral/10">
                <table className="w-full max-w-full h-full max-h-full border-collapse">
                    <thead className="w-full sticky top-0 bg-white">
                        <tr className="w-full">
                            {table.getFlatHeaders().map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="w-fit"
                                    >
                                        <div className="flex justify-start items-center gap-2 p-2 border-b border-b-neutral/10 border-t-2 border-t-white">
                                            <ButtonGhost
                                                onClick={header.column.getToggleSortingHandler()}
                                                icon={{
                                                    asc: <IconSortAscending size={16} />,
                                                    desc: <IconSortDescending size={16} />,
                                                }[header.column.getIsSorted() as string] ?? undefined}
                                                text={header.column.columnDef.header?.toString()}
                                            />
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className="w-full h-fit">
                        {
                            table.getRowModel().rows.length > 0
                                ? (null)
                                : (
                                    <tr>
                                        <td>
                                            <FormatNull
                                                text="Pas de données"
                                                className="p-2"
                                            />
                                        </td>
                                    </tr>
                                )
                        }
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    onClick={() => {
                                        if (!props.onRowClick) return
                                        props.onRowClick(row)
                                    }}
                                    className={cn(
                                        "w-full border-b border-neutral/5 last:border-b-0",
                                        !props.onRowClick ? "" : "cursor-pointer hover:bg-neutral/5"
                                    )}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className="w-fit last:w-[1%]">
                                                <div className="flex justify-start items-center p-2" >
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

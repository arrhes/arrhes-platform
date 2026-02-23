import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowUp, IconFolder } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormatDateTime } from "../../../../../../../components/formats/formatDateTime.js"
import { FormatNull } from "../../../../../../../components/formats/formatNull.js"
import { FormatText } from "../../../../../../../components/formats/formatText.js"
import { DataTable } from "../../../../../../../components/layouts/dataTable.js"
import { FileActions } from "./fileActions.js"
import { FolderActions } from "./folderActions.js"

type TableRow =
    | { kind: "back" }
    | { kind: "folder"; data: v.InferOutput<typeof returnedSchemas.folder> }
    | { kind: "file"; data: v.InferOutput<typeof returnedSchemas.file> }

export function FilesTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    files: Array<v.InferOutput<typeof returnedSchemas.file>>
    folders: Array<v.InferOutput<typeof returnedSchemas.folder>>
    currentFolderId: string | null
    parentFolderId: string | null
    onFolderOpen: (folderId: string | null) => void
    hasActiveFilters?: boolean
}) {
    const rows: Array<TableRow> = [
        ...(props.currentFolderId !== null ? [{ kind: "back" as const }] : []),
        ...props.folders.map((folder) => ({ kind: "folder" as const, data: folder })),
        ...props.files.map((file) => ({ kind: "file" as const, data: file })),
    ]

    return (
        <DataTable
            data={rows}
            isLoading={false}
            hideSearchBar
            columns={[
                {
                    accessorKey: "name",
                    header: "Nom",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") {
                            return (
                                <button
                                    type="button"
                                    onClick={() => props.onFolderOpen(props.parentFolderId)}
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2",
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                        padding: "0",
                                        fontWeight: "medium",
                                        color: "neutral/60",
                                        _hover: { color: "primary" },
                                    })}
                                >
                                    <IconArrowUp size={16} />
                                    ..
                                </button>
                            )
                        }
                        if (item.kind === "folder") {
                            return (
                                <button
                                    type="button"
                                    onClick={() => props.onFolderOpen(item.data.id)}
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2",
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                        padding: "0",
                                        fontWeight: "medium",
                                        color: "neutral",
                                        _hover: { color: "primary" },
                                    })}
                                >
                                    <IconFolder size={16} className={css({ color: "amber.500" })} />
                                    <FormatText>{item.data.name}</FormatText>
                                </button>
                            )
                        }
                        return !item.data.name ? <FormatNull /> : <FormatText>{item.data.name}</FormatText>
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "type",
                    header: "Type",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") return <span className={css({ color: "neutral/40" })}>--</span>
                        if (item.kind === "folder") return <FormatText>Dossier</FormatText>
                        return item.data.type?.split("/").at(1) ?? <FormatNull />
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "createdAt",
                    header: "Date",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") return <span className={css({ color: "neutral/40" })}>--</span>
                        return <FormatDateTime date={item.data.createdAt} />
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "actions",
                    header: " ",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") return null
                        if (item.kind === "folder") {
                            return (
                                <FolderActions
                                    folder={item.data}
                                    idOrganization={props.idOrganization}
                                    idYear={props.idYear}
                                    onFolderOpen={props.onFolderOpen}
                                />
                            )
                        }
                        return (
                            <FileActions file={item.data} idOrganization={props.idOrganization} idYear={props.idYear} />
                        )
                    },
                    enableSorting: false,
                    enableGlobalFilter: false,
                },
            ]}
        />
    )
}

import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonContent } from "@arrhes/ui"
import { IconEye, IconPlus } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormatDateTime } from "../../../../../../../components/formats/formatDateTime.js"
import { FormatFileSize } from "../../../../../../../components/formats/formatFileSize.js"
import { FormatNull } from "../../../../../../../components/formats/formatNull.js"
import { FormatText } from "../../../../../../../components/formats/formatText.js"
import { DataTable } from "../../../../../../../components/layouts/dataTable.js"
import { LinkButton } from "../../../../../../../components/linkButton.js"
import { CreateOneFile } from "./createOneFile.js"

export function FilesTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    files: Array<v.InferOutput<typeof returnedSchemas.file>>
}) {
    const filesData = props.files.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <DataTable
            data={filesData}
            isLoading={false}
            columns={[
                {
                    accessorKey: "actions",
                    header: " ",
                    cell: ({ row }) => (
                        <LinkButton
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/fichiers/$idFile"
                            params={{
                                idOrganization: props.idOrganization,
                                idYear: props.idYear,
                                idFile: row.original.id,
                            }}
                        >
                            <ButtonContent variant="invisible" leftIcon={<IconEye />} text={undefined} />
                        </LinkButton>
                    ),
                    enableSorting: false,
                    enableGlobalFilter: false,
                },
                {
                    accessorKey: "reference",
                    header: "Référence",
                    cell: ({ row }) => <FormatText>{row.original.reference}</FormatText>,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "name",
                    header: "Nom",
                    cell: ({ row }) =>
                        !row.original.name ? <FormatNull /> : <FormatText>{row.original.name}</FormatText>,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "type",
                    header: "Type",
                    cell: ({ row }) => row.original.type?.split("/").at(1),
                    filterFn: "includesString",
                },
                {
                    accessorKey: "size",
                    header: "Taille",
                    cell: ({ row }) => <FormatFileSize size={row.original.size} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "createdAt",
                    header: "Ajouté le",
                    cell: ({ row }) => <FormatDateTime date={row.original.createdAt} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "lastUpdatedAt",
                    header: "Dernière mise à jour le",
                    cell: ({ row }) => <FormatDateTime date={row.original.lastUpdatedAt} />,
                    filterFn: "includesString",
                },
            ]}
        >
            <CreateOneFile idOrganization={props.idOrganization} idYear={props.idYear}>
                <ButtonContent variant="primary" leftIcon={<IconPlus />} text="Ajouter un fichier" />
            </CreateOneFile>
        </DataTable>
    )
}

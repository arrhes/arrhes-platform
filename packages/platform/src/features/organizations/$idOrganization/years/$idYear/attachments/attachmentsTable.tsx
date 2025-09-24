import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPlus } from "@tabler/icons-react"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { FormatDate } from "components/formats/formatDate"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatFileSize } from "components/formats/formatFileSize"
import { FormatNull } from "components/formats/formatNull"
import { FormatText } from "components/formats/formatText"
import { DataTable } from "components/layouts/dataTable"
import { CreateOneAttachment } from "features/organizations/$idOrganization/years/$idYear/attachments/createOneAttachment"
import { platformRouter } from "routes/platformRouter"
import * as v from "valibot"


export function AttachmentsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    attachments: Array<v.InferOutput<typeof returnedSchemas.attachment>>
}) {
    const attachmentsData = props.attachments
        .sort((a, b) => b.date.localeCompare(a.date))

    return (
        <DataTable
            data={attachmentsData}
            isLoading={false}
            columns={[
                {
                    accessorKey: 'reference',
                    header: 'Référence',
                    cell: ({ row }) => (<FormatText>
                        {row.original.reference}
                    </FormatText>),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'label',
                    header: "Libellé",
                    cell: ({ row }) => (!row.original.label ? <FormatNull /> : <FormatText>
                        {row.original.label}
                    </FormatText>),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'date',
                    header: "Date",
                    cell: ({ row }) => (<FormatDate date={row.original.date} />),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'type',
                    header: "Type",
                    cell: ({ row }) => (row.original.type?.split("/").at(1)),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'size',
                    header: "Taille",
                    cell: ({ row }) => (<FormatFileSize size={row.original.size} />),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'createdAt',
                    header: "Ajouté le",
                    cell: ({ row }) => (<FormatDateTime date={row.original.createdAt} />),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'lastUpdatedAt',
                    header: "Dernière mise à jour le",
                    cell: ({ row }) => (<FormatDateTime date={row.original.lastUpdatedAt} />),
                    filterFn: 'includesString'
                }
            ]}
            onRowClick={(row) => {
                platformRouter.navigate({
                    to: "/organisations/$idOrganization/exercices/$idYear/fichiers/$idAttachment",
                    params: {
                        idOrganization: props.idOrganization,
                        idYear: props.idYear,
                        idAttachment: row.original.id
                    }
                })
            }}
        >
            <CreateOneAttachment
                idOrganization={props.idOrganization}
                idYear={props.idYear}
            >
                <ButtonPlainContent
                    icon={<IconPlus />}
                    text="Ajouter un fichier"
                />
            </CreateOneAttachment>
        </DataTable>
    )
}

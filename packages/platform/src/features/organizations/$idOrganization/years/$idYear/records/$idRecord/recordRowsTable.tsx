import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import { ButtonGhostContent } from "#/components/buttons/buttonGhostContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataTable } from "#/components/layouts/dataTable.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { UpdateOneRecordRow } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/updateOneRecordRow.js"
import { CreateOneRecordRow } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/createOneRecordRow.js"
import { readOneAccountRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { IconEye, IconPencil, IconPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import * as v from "valibot"


export function RecordRowsTable(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    isLoading?: boolean
}) {
    return (
        <DataTable
            data={props.recordRows}
            isLoading={false}
            columns={[
                {
                    accessorKey: "actions",
                    header: " ",
                    cell: ({ row }) => (
                        <div className="flex justify-center items-center">
                            <UpdateOneRecordRow
                                recordRow={row.original}
                            >
                                <ButtonGhost
                                    icon={<IconPencil />}
                                    text={undefined}
                                />
                            </UpdateOneRecordRow>
                            <Link
                                to="/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow"
                                params={{
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                    idRecord: row.original.idRecord,
                                    idRecordRow: row.original.id
                                }}
                            >
                                <ButtonGhostContent
                                    icon={<IconEye />}
                                    text={undefined}
                                />
                            </Link>
                        </div>
                    ),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'label',
                    header: 'Libellé',
                    cell: ({ row }) => (
                        <FormatText>
                            {row.original.label}
                        </FormatText>
                    ),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'idAccount',
                    header: 'Compte',
                    cell: ({ row }) => (
                        <DataWrapper
                            routeDefinition={readOneAccountRouteDefinition}
                            body={{
                                idOrganization: props.record.idOrganization,
                                idYear: props.record.idYear,
                                idAccount: row.original.idAccount
                            }}
                        >
                            {(account) => (
                                <div className="flex justify-start items-start gap-2">
                                    <FormatText className="overflow-visible">
                                        {account.number}
                                    </FormatText>
                                    <FormatText wrap={true} className="text-neutral/50">
                                        {account.label}
                                    </FormatText>
                                </div>
                            )}
                        </DataWrapper>
                    ),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'debit',
                    header: "Débit",
                    cell: ({ row }) => (
                        <FormatPrice
                            price={row.original.debit}
                        />
                    ),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'credit',
                    header: "Crédit",
                    cell: ({ row }) => (
                        <FormatPrice
                            price={row.original.credit}
                        />
                    ),
                    filterFn: 'includesString'
                },
                {
                    accessorKey: 'createdAt',
                    header: "Ajouté le",
                    cell: ({ row }) => (
                        <FormatDateTime
                            date={row.original.createdAt}
                        />
                    ),
                    filterFn: 'includesString'
                }
            ]}
            onRowClick={(row) => {
                // platformRouter.navigate({
                //     to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow",
                //     params: {
                //         idOrganization: props.record.idOrganization,
                //         idYear: props.record.idYear,
                //         idRecord: row.original.idRecord,
                //         idRecordRow: row.original.id
                //     }
                // })
            }}
        >
            <CreateOneRecordRow
                record={props.record}
            >
                <ButtonPlainContent
                    icon={<IconPlus />}
                    text="Ajouter un mouvement"
                />
            </CreateOneRecordRow>
        </DataTable>
    )
}

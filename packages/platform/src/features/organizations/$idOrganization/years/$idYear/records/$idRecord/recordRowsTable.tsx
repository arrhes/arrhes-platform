import { readOneAccountRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { IconPlus } from "@tabler/icons-react"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatPrice } from "components/formats/formatPrice"
import { FormatText } from "components/formats/formatText"
import { DataTable } from "components/layouts/dataTable"
import { DataWrapper } from "components/layouts/dataWrapper"
import { CreateOneRecordRow } from "features/organizations/$idOrganization/years/$idYear/records/$idRecord/createOneRecordRow"
import { platformRouter } from "routes/platformRouter"
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
                                <span>
                                    {`${account.number}`}
                                </span>
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
                platformRouter.navigate({
                    to: "/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow",
                    params: {
                        idOrganization: props.record.idOrganization,
                        idYear: props.record.idYear,
                        idRecord: row.original.idRecord,
                        idRecordRow: row.original.id
                    }
                })
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

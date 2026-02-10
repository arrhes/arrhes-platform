import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconEdit, IconEye, IconPencil, IconPlus } from "@tabler/icons-react"
import * as v from "valibot"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { DataTable } from "../../../../../../../../components/layouts/dataTable.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { LinkButton } from "../../../../../../../../components/linkButton.tsx"
import { UpdateOneRecordRow } from "./$idRecordRow/updateOneRecordRow.tsx"
import { CreateOneRecordRow } from "./createOneRecordRow.tsx"
import { UpdateManyRecordRows } from "./updateManyRecordRows.tsx"


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
                        <div className={css({ display: "flex", justifyContent: "center", alignItems: "center" })}>
                            <UpdateOneRecordRow
                                recordRow={row.original}
                            >
                                <ButtonContent
                                    variant="invisible"
                                    leftIcon={<IconPencil />}
                                    text={undefined}
                                />
                            </UpdateOneRecordRow>
                            <LinkButton
                                to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow"
                                params={{
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                    idRecord: row.original.idRecord,
                                    idRecordRow: row.original.id
                                }}
                            >
                                <ButtonContent
                                    variant="invisible"
                                    leftIcon={<IconEye />}
                                    text={undefined}
                                />
                            </LinkButton>
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
                                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "2" })}>
                                    <FormatText className={css({ overflow: "visible" })}>
                                        {account.number}
                                    </FormatText>
                                    <FormatText wrap={true} className={css({ color: "neutral/50" })}>
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
                //     to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow",
                //     params: {
                //         idOrganization: props.record.idOrganization,
                //         idYear: props.record.idYear,
                //         idRecord: row.original.idRecord,
                //         idRecordRow: row.original.id
                //     }
                // })
            }}
        >
            <div className={css({ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1" })}>
                <CreateOneRecordRow
                    record={props.record}
                >
                    <ButtonContent
                        variant="primary"
                        leftIcon={<IconPlus />}
                        text="Ajouter un mouvement"
                    />
                </CreateOneRecordRow>
                <UpdateManyRecordRows
                    record={props.record}
                >
                    <ButtonContent
                        variant="default"
                        leftIcon={<IconEdit />}
                        text="Modifier plusieurs mouvements"
                    />
                </UpdateManyRecordRows>
            </div>
        </DataTable>
    )
}

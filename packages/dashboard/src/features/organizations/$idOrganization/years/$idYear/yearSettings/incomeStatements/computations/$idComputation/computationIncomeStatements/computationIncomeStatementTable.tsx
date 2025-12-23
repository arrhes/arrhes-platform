import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Chip } from "#/components/layouts/chip.js"
import { DataTable } from "#/components/layouts/dataTable.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { CreateOneComputationIncomeStatement } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/createOneComputationIncomeStatement.js"
import { platformRouter } from "#/routes/platformRouter.js"
import { readAllComputationIncomeStatementsRouteDefinition, readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import * as v from "valibot"


export function ComputationIncomeStatementsTable(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
}) {
    return (
        <DataWrapper
            routeDefinition={readAllComputationIncomeStatementsRouteDefinition}
            body={{
                idComputation: props.computation.id,
                idYear: props.computation.idYear,
                idOrganization: props.computation.idOrganization,
            }}
        >
            {(computationIncomeStatements) => {
                return (
                    <DataTable
                        data={computationIncomeStatements}
                        isLoading={false}
                        columns={[
                            {
                                accessorKey: 'idStatement',
                                header: 'Poste du compte de résultat',
                                cell: ({ row }) => (
                                    <DataWrapper
                                        routeDefinition={readOneIncomeStatementRouteDefinition}
                                        body={{
                                            idOrganization: row.original.idOrganization,
                                            idYear: row.original.idYear,
                                            idIncomeStatement: row.original.idIncomeStatement
                                        }}
                                    >
                                        {(incomeStatement) => (
                                            <FormatText>
                                                {`${incomeStatement.number} - ${incomeStatement.label}`}
                                            </FormatText>
                                        )}
                                    </DataWrapper>
                                ),
                                filterFn: 'includesString'
                            },
                            {
                                accessorKey: 'operation',
                                header: 'Opération',
                                cell: ({ row }) => (
                                    <Chip
                                        text={(row.original.operation === "plus") ? "Addition" : "Soustraction"}
                                    />
                                ),
                                filterFn: 'includesString'
                            },
                            {
                                accessorKey: 'createdAt',
                                header: "Ajouté le",
                                cell: ({ row }) => (<FormatDateTime date={row.original.createdAt} />),
                                filterFn: 'includesString'
                            }
                        ]}
                        onRowClick={(row) => {
                            platformRouter.navigate({
                                to: "/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation/$idComputationIncomeStatement",
                                params: {
                                    idOrganization: row.original.idOrganization,
                                    idYear: row.original.idYear,
                                    idComputation: row.original.idComputation,
                                    idComputationIncomeStatement: row.original.id,
                                }
                            })
                        }}
                    >
                        <CreateOneComputationIncomeStatement
                            computation={props.computation}
                        >
                            <ButtonPlain
                                icon={<IconPlus />}
                                text="Ajouter"
                            />
                        </CreateOneComputationIncomeStatement>
                    </DataTable>
                )
            }}
        </DataWrapper>
    )
}
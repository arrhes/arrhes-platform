import { readAllAccountsRouteDefinition, readAllComputationIncomeStatementsRouteDefinition, readAllComputationsRouteDefinition, readAllIncomeStatementsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/schemas/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { IncomeStatementsReportTable } from "features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementsReportTable"
import { incomeStatementReportRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute"


export function IncomeStatementReportPage() {
    const params = useParams({ from: incomeStatementReportRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <DataWrapper
                    routeDefinition={readAllAccountsRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                    }}
                >
                    {(accounts) => {
                        return (
                            <DataWrapper
                                routeDefinition={readAllRecordRowsRouteDefinition}
                                body={{
                                    idOrganization: params.idOrganization,
                                    idYear: params.idYear,
                                    idRecord: undefined,
                                }}
                            >
                                {(recordRows) => {
                                    return (
                                        <DataWrapper
                                            routeDefinition={readAllIncomeStatementsRouteDefinition}
                                            body={{
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                            }}
                                        >
                                            {(incomeStatements) => {
                                                return (
                                                    <DataWrapper
                                                        routeDefinition={readAllComputationsRouteDefinition}
                                                        body={{
                                                            idOrganization: params.idOrganization,
                                                            idYear: params.idYear,
                                                        }}
                                                    >
                                                        {(computations) => {
                                                            return (
                                                                <DataWrapper
                                                                    routeDefinition={readAllComputationIncomeStatementsRouteDefinition}
                                                                    body={{
                                                                        idOrganization: params.idOrganization,
                                                                        idYear: params.idYear,
                                                                    }}
                                                                >
                                                                    {(computationIncomeStatements) => {
                                                                        return (
                                                                            <Box>
                                                                                <IncomeStatementsReportTable
                                                                                    incomeStatements={incomeStatements}
                                                                                    computations={computations}
                                                                                    computationIncomeStatements={computationIncomeStatements}
                                                                                    recordRows={recordRows}
                                                                                    accounts={accounts}
                                                                                />
                                                                            </Box>
                                                                        )
                                                                    }}
                                                                </DataWrapper>
                                                            )
                                                        }}
                                                    </DataWrapper>
                                                )
                                            }}
                                        </DataWrapper>
                                    )
                                }}
                            </DataWrapper>
                        )
                    }}
                </DataWrapper>
            </Section.Item>
        </Section.Root>
    )
}
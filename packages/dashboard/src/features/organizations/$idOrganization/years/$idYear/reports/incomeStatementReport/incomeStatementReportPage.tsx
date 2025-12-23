import { ButtonOutline } from "#/components/buttons/buttonOutline.js"
import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { DownloadIncomeStatementReport } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/downloadIncomeStatementReport.js"
import { IncomeStatementsReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/incomeStatementReport/incomeStatementsReportTable.js"
import { incomeStatementReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.js"
import { readAllAccountsRouteDefinition, readAllComputationIncomeStatementsRouteDefinition, readAllComputationsRouteDefinition, readAllIncomeStatementsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function IncomeStatementReportPage() {
    const params = useParams({ from: incomeStatementReportRoute.id })

    return (
        <Section.Root>
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
                                                                        <Section.Item>
                                                                            <div className="w-full flex justify-end items-start gap-2">
                                                                                <DownloadIncomeStatementReport
                                                                                    idOrganization={params.idOrganization}
                                                                                    idYear={params.idYear}
                                                                                >
                                                                                    <ButtonOutline
                                                                                        icon={<IconDownload />}
                                                                                        text="Télécharger en pdf"
                                                                                        hasLoader={true}
                                                                                    />
                                                                                </DownloadIncomeStatementReport>
                                                                            </div>
                                                                            <Box>
                                                                                <IncomeStatementsReportTable
                                                                                    incomeStatements={incomeStatements}
                                                                                    computations={computations}
                                                                                    computationIncomeStatements={computationIncomeStatements}
                                                                                    recordRows={recordRows.filter((recordRow) => recordRow.isComputedForIncomeStatementReport === true)}
                                                                                    accounts={accounts.filter((account) => account.type === "income-statement")}
                                                                                />
                                                                            </Box>
                                                                        </Section.Item>
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
        </Section.Root>
    )
}
import {
    readAllAccountsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllRecordRowsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { incomeStatementReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.tsx"
import { DownloadIncomeStatementReport } from "./downloadIncomeStatementReport.tsx"
import { IncomeStatementsReportTable } from "./incomeStatementsReportTable.tsx"

export function IncomeStatementReportPage() {
    const params = useParams({ from: incomeStatementReportRoute.id })

    return (
        <Page.Root>
            <Page.Content>
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
                                                                        routeDefinition={
                                                                            readAllComputationIncomeStatementsRouteDefinition
                                                                        }
                                                                        body={{
                                                                            idOrganization: params.idOrganization,
                                                                            idYear: params.idYear,
                                                                        }}
                                                                    >
                                                                        {(computationIncomeStatements) => {
                                                                            return (
                                                                                <Section.Item>
                                                                                    <div
                                                                                        className={css({
                                                                                            width: "100%",
                                                                                            display: "flex",
                                                                                            justifyContent: "end",
                                                                                            alignItems: "start",
                                                                                            gap: "2",
                                                                                        })}
                                                                                    >
                                                                                        <DownloadIncomeStatementReport
                                                                                            idOrganization={
                                                                                                params.idOrganization
                                                                                            }
                                                                                            idYear={params.idYear}
                                                                                        >
                                                                                            <ButtonContent
                                                                                                leftIcon={
                                                                                                    <IconDownload />
                                                                                                }
                                                                                                text="Télécharger en pdf"
                                                                                                variant="default"
                                                                                            />
                                                                                        </DownloadIncomeStatementReport>
                                                                                    </div>
                                                                                    <Box>
                                                                                        <IncomeStatementsReportTable
                                                                                            incomeStatements={
                                                                                                incomeStatements
                                                                                            }
                                                                                            computations={computations}
                                                                                            computationIncomeStatements={
                                                                                                computationIncomeStatements
                                                                                            }
                                                                                            recordRows={recordRows.filter(
                                                                                                (recordRow) =>
                                                                                                    recordRow.isComputedForIncomeStatementReport ===
                                                                                                    true,
                                                                                            )}
                                                                                            accounts={accounts.filter(
                                                                                                (account) =>
                                                                                                    account.type ===
                                                                                                    "income-statement",
                                                                                            )}
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
            </Page.Content>
        </Page.Root>
    )
}

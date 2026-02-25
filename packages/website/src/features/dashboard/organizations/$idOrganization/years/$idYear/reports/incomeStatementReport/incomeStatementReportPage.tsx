import {
    readAllAccountsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllRecordRowsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { FormatError } from "../../../../../../../../components/formats/formatError.tsx"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { incomeStatementReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.tsx"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.js"
import { DownloadIncomeStatementReport } from "./downloadIncomeStatementReport.tsx"
import { IncomeStatementsReportTable } from "./incomeStatementsReportTable.tsx"

export function IncomeStatementReportPage() {
    const params = useParams({ from: incomeStatementReportRoute.id })

    const body = useMemo(
        () => ({
            idOrganization: params.idOrganization,
            idYear: params.idYear,
        }),
        [params.idOrganization, params.idYear],
    )

    const accountsQuery = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body,
    })

    const recordRowsQuery = useDataFromAPI({
        routeDefinition: readAllRecordRowsRouteDefinition,
        body,
    })

    const incomeStatementsQuery = useDataFromAPI({
        routeDefinition: readAllIncomeStatementsRouteDefinition,
        body,
    })

    const computationsQuery = useDataFromAPI({
        routeDefinition: readAllComputationsRouteDefinition,
        body,
    })

    const computationIncomeStatementsQuery = useDataFromAPI({
        routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
        body,
    })

    const isPending =
        accountsQuery.isPending ||
        recordRowsQuery.isPending ||
        incomeStatementsQuery.isPending ||
        computationsQuery.isPending ||
        computationIncomeStatementsQuery.isPending

    const isError =
        accountsQuery.data === undefined ||
        recordRowsQuery.data === undefined ||
        incomeStatementsQuery.data === undefined ||
        computationsQuery.data === undefined ||
        computationIncomeStatementsQuery.data === undefined

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const accounts = accountsQuery.data
    const recordRows = recordRowsQuery.data
    const incomeStatements = incomeStatementsQuery.data
    const computations = computationsQuery.data
    const computationIncomeStatements = computationIncomeStatementsQuery.data

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
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
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                            >
                                <ButtonOutlineContent leftIcon={<IconDownload />} text="Télécharger en pdf" />
                            </DownloadIncomeStatementReport>
                        </div>
                        <Box>
                            <IncomeStatementsReportTable
                                incomeStatements={incomeStatements}
                                computations={computations}
                                computationIncomeStatements={computationIncomeStatements}
                                recordRows={recordRows.filter(
                                    (recordRow) => recordRow.isComputedForIncomeStatementReport === true,
                                )}
                                accounts={accounts.filter((account) => account.type === "income-statement")}
                            />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}

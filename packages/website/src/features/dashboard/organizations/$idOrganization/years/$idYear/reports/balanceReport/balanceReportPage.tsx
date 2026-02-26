import { readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { FormatError } from "../../../../../../../../components/formats/formatError.tsx"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { balanceReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.tsx"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.js"
import { BalanceReportTable } from "./balanceReportTable.tsx"

export function BalanceReportPage() {
    const params = useParams({ from: balanceReportRoute.id })

    const body = useMemo(
        () => ({
            idYear: params.idYear,
        }),
        [params.idYear],
    )

    const accountsQuery = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body,
    })

    const recordRowsQuery = useDataFromAPI({
        routeDefinition: readAllRecordRowsRouteDefinition,
        body,
    })

    const isPending = accountsQuery.isPending || recordRowsQuery.isPending

    const isError = accountsQuery.data === undefined || recordRowsQuery.data === undefined

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const accounts = accountsQuery.data
    const recordRows = recordRowsQuery.data

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item>
                        <Box>
                            <BalanceReportTable
                                recordRows={recordRows.filter(
                                    (recordRow) => recordRow.isComputedForBalanceReport === true,
                                )}
                                accounts={accounts}
                            />
                        </Box>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}

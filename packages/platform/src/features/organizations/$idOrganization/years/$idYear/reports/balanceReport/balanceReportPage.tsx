import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { BalanceReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceReport/balanceReportTable.js"
import { balanceReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.js"
import { readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/metadata/routes"
import { useParams } from "@tanstack/react-router"


export function BalanceReportPage() {
    const params = useParams({ from: balanceReportRoute.id })

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
                                        <Box>
                                            <BalanceReportTable
                                                recordRows={recordRows.filter((recordRow) => recordRow.isComputedForBalanceReport === true)}
                                                accounts={accounts}
                                            />
                                        </Box>
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
import { readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/schemas/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { BalanceReportTable } from "features/organizations/$idOrganization/years/$idYear/reports/balanceReport/balanceReportTable"
import { balanceReportRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute"


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
            </Section.Item>
        </Section.Root>
    )
}
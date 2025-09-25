import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { LedgerReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/ledgerReport/ledgerReportTable.js"
import { ledgerReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/ledgerReportRoute.js"
import { readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/metadata/routes"
import { useParams } from "@tanstack/react-router"


export function LedgerReportPage() {
    const params = useParams({ from: ledgerReportRoute.id })

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
                                            <LedgerReportTable
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
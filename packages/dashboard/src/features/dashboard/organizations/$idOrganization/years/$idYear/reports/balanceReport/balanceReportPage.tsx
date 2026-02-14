import { readAllAccountsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { balanceReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.tsx"
import { BalanceReportTable } from "./balanceReportTable.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"


export function BalanceReportPage() {
    const params = useParams({ from: balanceReportRoute.id })

    return (
        <Page.Root>
            <Page.Content>
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
            </Page.Content>
        </Page.Root>
    )
}
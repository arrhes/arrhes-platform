import { readAllAccountsRouteDefinition, readAllBalanceSheetsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/schemas/routes"
import { useParams } from "@tanstack/react-router"
import { Box } from "components/layouts/box"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { BalanceSheetAssetsTable } from "features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAssetsTable"
import { BalanceSheetLiabilitiesTable } from "features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiabilitiesTable"
import { balanceSheetReportRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute"


export function BalanceSheetReportPage() {
    const params = useParams({ from: balanceSheetReportRoute.id })

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
                                            routeDefinition={readAllBalanceSheetsRouteDefinition}
                                            body={{
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                            }}
                                        >
                                            {(balanceSheets) => {
                                                return (
                                                    <Box>
                                                        <Section.Root>
                                                            <Section.Item>
                                                                {/* <div className="w-full min-w-full max-w-full h-full max-h-full grid grid-cols-2 grid-rows-[max-content_auto] overflow-auto rounded-md border border-neutral/10"> */}
                                                                {/* <div className="w-full px-3 py-1.5 border-r border-b border-neutral/10 flex justify-between items-center gap-3">
                        <span className="text-lg uppercase text-neutral/50">Actif</span>
                        <FormatPrice price={totalSheetAsset} />
                    </div>
                    <div className="w-full px-3 py-1.5 border-r border-b border-neutral/10 flex justify-between items-center gap-3">
                        <span className="text-lg uppercase text-neutral/50">Passif</span>
                        <FormatPrice price={totalSheetLiability} />
                    </div> */}
                                                                <BalanceSheetAssetsTable
                                                                    balanceSheets={balanceSheets}
                                                                    recordRows={recordRows}
                                                                    accounts={accounts}
                                                                />
                                                                <BalanceSheetLiabilitiesTable
                                                                    balanceSheets={balanceSheets}
                                                                    recordRows={recordRows}
                                                                    accounts={accounts}
                                                                />
                                                                {/* </div> */}
                                                            </Section.Item>
                                                        </Section.Root>
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
            </Section.Item>
        </Section.Root>
    )
}
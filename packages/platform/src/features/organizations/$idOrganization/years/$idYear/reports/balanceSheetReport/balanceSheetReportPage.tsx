import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { BalanceSheetAssetsReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAsset/balanceSheetAssetsReportTable.js"
import { BalanceSheetLiabilitiesReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiability/balanceSheetLiabilitiesReportTable.js"
import { balanceSheetReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.js"
import { readAllAccountsRouteDefinition, readAllBalanceSheetsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/metadata/routes"
import { useParams } from "@tanstack/react-router"


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
                                                    <div className="w-full flex flex-row justify-start items-start gap-4 flex-wrap">
                                                        <Box className="gap-4 max-h-[640px]">
                                                            <TitleComponent className="p-4">
                                                                Actif
                                                            </TitleComponent>
                                                            <BalanceSheetAssetsReportTable
                                                                balanceSheets={balanceSheets.filter((balanceSheet) => balanceSheet.side === "asset")}
                                                                recordRows={recordRows}
                                                                accounts={accounts}
                                                            />
                                                        </Box>
                                                        <Box className="gap-4 max-h-[640px]">
                                                            <TitleComponent className="p-4">
                                                                Passif
                                                            </TitleComponent>
                                                            <BalanceSheetLiabilitiesReportTable
                                                                balanceSheets={balanceSheets.filter((balanceSheet) => balanceSheet.side === "liability")}
                                                                recordRows={recordRows}
                                                                accounts={accounts}
                                                            />
                                                        </Box>
                                                    </div>
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
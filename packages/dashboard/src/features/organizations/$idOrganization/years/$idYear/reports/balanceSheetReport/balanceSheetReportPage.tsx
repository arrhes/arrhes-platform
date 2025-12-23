import { ButtonOutline } from "#/components/buttons/buttonOutline.js"
import { Box } from "#/components/layouts/box.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { BalanceSheetAssetsReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAsset/balanceSheetAssetsReportTable.js"
import { BalanceSheetLiabilitiesReportTable } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiability/balanceSheetLiabilitiesReportTable.js"
import { DownloadBalanceSheetReport } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/downloadBalanceSheetReport.js"
import { balanceSheetReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.js"
import { readAllAccountsRouteDefinition, readAllBalanceSheetsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function BalanceSheetReportPage() {
    const params = useParams({ from: balanceSheetReportRoute.id })

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
                                        routeDefinition={readAllBalanceSheetsRouteDefinition}
                                        body={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                        }}
                                    >
                                        {(balanceSheets) => {
                                            return (
                                                <Section.Item>
                                                    <div className="w-full flex justify-end items-start gap-2">
                                                        <DownloadBalanceSheetReport
                                                            idOrganization={params.idOrganization}
                                                            idYear={params.idYear}
                                                        >
                                                            <ButtonOutline
                                                                icon={<IconDownload />}
                                                                text="Télécharger en pdf"
                                                                hasLoader={true}
                                                            />
                                                        </DownloadBalanceSheetReport>
                                                    </div>
                                                    <div className="w-full flex flex-row justify-start items-start gap-4 flex-wrap">
                                                        <Box className="gap-4">
                                                            <TitleComponent className="p-4">
                                                                Actif
                                                            </TitleComponent>
                                                            <BalanceSheetAssetsReportTable
                                                                balanceSheets={balanceSheets.filter((balanceSheet) => balanceSheet.side === "asset")}
                                                                recordRows={recordRows.filter((recordRow) => recordRow.isComputedForBalanceSheetReport === true)}
                                                                accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                                            />
                                                        </Box>
                                                        <Box className="gap-4">
                                                            <TitleComponent className="p-4">
                                                                Passif
                                                            </TitleComponent>
                                                            <BalanceSheetLiabilitiesReportTable
                                                                balanceSheets={balanceSheets.filter((balanceSheet) => balanceSheet.side === "liability")}
                                                                recordRows={recordRows.filter((recordRow) => recordRow.isComputedForBalanceSheetReport === true)}
                                                                accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                                            />
                                                        </Box>
                                                    </div>
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
        </Section.Root>
    )
}
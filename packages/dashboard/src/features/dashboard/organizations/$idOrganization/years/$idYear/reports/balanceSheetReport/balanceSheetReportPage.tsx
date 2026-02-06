import { readAllAccountsRouteDefinition, readAllBalanceSheetsRouteDefinition, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../components/layouts/title.tsx"
import { balanceSheetReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/balanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/balanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./downloadBalanceSheetReport.tsx"


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
                                                    <div className={css({ w: "full", display: "flex", justifyContent: "end", alignItems: "start", gap: "2" })}>
                                                        <DownloadBalanceSheetReport
                                                            idOrganization={params.idOrganization}
                                                            idYear={params.idYear}
                                                        >
                                                            <Button
                                                                icon={<IconDownload />}
                                                                text="Télécharger en pdf"
                                                                hasLoader={true}
                                                                variant="default"
                                                            />
                                                        </DownloadBalanceSheetReport>
                                                    </div>
                                                    <div className={css({ w: "full", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "start", gap: "4", flexWrap: "wrap" })}>
                                                        <Box className={css({ gap: "4" })}>
                                                            <TitleComponent className={css({ p: "4" })}>
                                                                Actif
                                                            </TitleComponent>
                                                            <BalanceSheetAssetsReportTable
                                                                balanceSheets={balanceSheets.filter((balanceSheet) => balanceSheet.side === "asset")}
                                                                recordRows={recordRows.filter((recordRow) => recordRow.isComputedForBalanceSheetReport === true)}
                                                                accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                                            />
                                                        </Box>
                                                        <Box className={css({ gap: "4" })}>
                                                            <TitleComponent className={css({ p: "4" })}>
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

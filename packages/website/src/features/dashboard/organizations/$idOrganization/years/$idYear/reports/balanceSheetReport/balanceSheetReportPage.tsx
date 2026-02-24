import {
    readAllAccountsRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
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
import { TitleComponent } from "../../../../../../../../components/layouts/title.tsx"
import { balanceSheetReportRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.js"
import { BalanceSheetAssetsReportTable } from "./balanceSheetAsset/balanceSheetAssetsReportTable.tsx"
import { BalanceSheetLiabilitiesReportTable } from "./balanceSheetLiability/balanceSheetLiabilitiesReportTable.tsx"
import { DownloadBalanceSheetReport } from "./downloadBalanceSheetReport.tsx"

export function BalanceSheetReportPage() {
    const params = useParams({ from: balanceSheetReportRoute.id })

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
        body: useMemo(
            () => ({
                idOrganization: params.idOrganization,
                idYear: params.idYear,
                idRecord: undefined,
            }),
            [params.idOrganization, params.idYear],
        ),
    })

    const balanceSheetsQuery = useDataFromAPI({
        routeDefinition: readAllBalanceSheetsRouteDefinition,
        body,
    })

    const isPending = accountsQuery.isPending || recordRowsQuery.isPending || balanceSheetsQuery.isPending

    const isError =
        accountsQuery.data === undefined || recordRowsQuery.data === undefined || balanceSheetsQuery.data === undefined

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const accounts = accountsQuery.data
    const recordRows = recordRowsQuery.data
    const balanceSheets = balanceSheetsQuery.data

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
                            <DownloadBalanceSheetReport idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent leftIcon={<IconDownload />} text="Télécharger en pdf" />
                            </DownloadBalanceSheetReport>
                        </div>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "4",
                                flexWrap: "wrap",
                            })}
                        >
                            <Box className={css({ gap: "4" })}>
                                <TitleComponent className={css({ padding: "4" })}>Actif</TitleComponent>
                                <BalanceSheetAssetsReportTable
                                    balanceSheets={balanceSheets.filter(
                                        (balanceSheet) => balanceSheet.side === "asset",
                                    )}
                                    recordRows={recordRows.filter(
                                        (recordRow) => recordRow.isComputedForBalanceSheetReport === true,
                                    )}
                                    accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                />
                            </Box>
                            <Box className={css({ gap: "4" })}>
                                <TitleComponent className={css({ padding: "4" })}>Passif</TitleComponent>
                                <BalanceSheetLiabilitiesReportTable
                                    balanceSheets={balanceSheets.filter(
                                        (balanceSheet) => balanceSheet.side === "liability",
                                    )}
                                    recordRows={recordRows.filter(
                                        (recordRow) => recordRow.isComputedForBalanceSheetReport === true,
                                    )}
                                    accounts={accounts.filter((account) => account.type === "balance-sheet")}
                                />
                            </Box>
                        </div>
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}

import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLine, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../components/layouts/title.tsx"
import { balanceSheetsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.tsx"
import { BalanceSheetTable } from "./balanceSheetTable.tsx"
import { ConnectAccountsToBalanceSheets } from "./connectAccountsToBalanceSheets.tsx"
import { CreateOneBalanceSheet } from "./createOneBalanceSheet.tsx"
import { GenerateBalanceSheets } from "./generateBalanceSheets.tsx"


export function BalanceSheetsPage() {
    const params = useParams({ from: balanceSheetsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ minWidth: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2", flexWrap: "wrap" })}>
                    <CreateOneBalanceSheet
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconPlus />}
                            text="Ajouter une ligne de bilan"
                        />
                    </CreateOneBalanceSheet>
                    <GenerateBalanceSheets
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="default"
                            leftIcon={<IconPlus />}
                            text="Générer les lignes de bilan par défaut"
                        />
                    </GenerateBalanceSheets>
                    <ConnectAccountsToBalanceSheets
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="default"
                            leftIcon={<IconLine />}
                            text="Connecter les comptes aux lignes de bilan par défaut"
                        />
                    </ConnectAccountsToBalanceSheets>
                </div>
                <div className={css({ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", gap: "2", flexWrap: "wrap" })}>
                    <Box className={css({ padding: "4", gap: "4", maxH: "[640px]" })}>
                        <TitleComponent>
                            Actif
                        </TitleComponent>
                        <BalanceSheetTable
                            idOrganization={params.idOrganization}
                            idYear={params.idYear}
                            filter={(balanceSheet) => balanceSheet.side === "asset"}
                        />
                    </Box>
                    <Box className={css({ padding: "4", gap: "4", maxH: "[640px]" })}>
                        <TitleComponent>
                            Passif
                        </TitleComponent>
                        <BalanceSheetTable
                            idOrganization={params.idOrganization}
                            idYear={params.idYear}
                            filter={(balanceSheet) => balanceSheet.side === "liability"}
                        />
                    </Box>
                </div>
            </Section.Item>
        </Section.Root>
    )
}

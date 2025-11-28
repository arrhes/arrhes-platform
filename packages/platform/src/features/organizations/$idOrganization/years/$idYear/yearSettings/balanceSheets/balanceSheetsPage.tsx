import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { Box } from "#/components/layouts/box.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { BalanceSheetTable } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetTable.js"
import { ConnectAccountsToBalanceSheets } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/connectAccountsToBalanceSheets.js"
import { CreateOneBalanceSheet } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/createOneBalanceSheet.js"
import { GenerateBalanceSheets } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/generateBalanceSheets.js"
import { balanceSheetsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.js"
import { IconLine, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function BalanceSheetsPage() {
    const params = useParams({ from: balanceSheetsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="min-w-full flex justify-end items-center gap-2 flex-wrap">
                    <CreateOneBalanceSheet
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
                            text="Ajouter une ligne de bilan"
                        />
                    </CreateOneBalanceSheet>
                    <GenerateBalanceSheets
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconPlus />}
                            text="Générer les lignes de bilan par défaut"
                        />
                    </GenerateBalanceSheets>
                    <ConnectAccountsToBalanceSheets
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconLine />}
                            text="Connecter les comptes aux lignes de bilan par défaut"
                        />
                    </ConnectAccountsToBalanceSheets>
                </div>
                <div className="w-full flex flex-row justify-start items-start gap-2 flex-wrap">
                    <Box className="p-4 gap-4 max-h-[640px]">
                        <TitleComponent>
                            Actif
                        </TitleComponent>
                        <BalanceSheetTable
                            idOrganization={params.idOrganization}
                            idYear={params.idYear}
                            filter={(balanceSheet) => balanceSheet.side === "asset"}
                        />
                    </Box>
                    <Box className="p-4 gap-4 max-h-[640px]">
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
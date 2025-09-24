import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { Box } from "components/layouts/box"
import { Section } from "components/layouts/section/section"
import { TitleComponent } from "components/layouts/title"
import { BalanceSheetAssetsTable } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetAssetsTable"
import { BalanceSheetLiabilitiesTable } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetLiabilitiesTable"
import { CreateOneBalanceSheet } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/createOneBalanceSheet"
import { GenerateBalanceSheets } from "features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/generateBalanceSheets"
import { balanceSheetsRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute"


export function BalanceSheetsPage() {
    const params = useParams({ from: balanceSheetsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
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
                            text="Générer le bilan par défaut"
                        />
                    </GenerateBalanceSheets>
                </div>
                <div className="w-full flex flex-row justify-start items-start gap-2 flex-wrap">
                    <Box className="p-4 gap-4 max-h-[640px]">
                        <TitleComponent>
                            Actif
                        </TitleComponent>
                        <BalanceSheetAssetsTable
                            idOrganization={params.idOrganization}
                            idYear={params.idYear}
                        />
                    </Box>
                    <Box className="p-4 gap-4 max-h-[640px]">
                        <TitleComponent>
                            Passif
                        </TitleComponent>
                        <BalanceSheetLiabilitiesTable
                            idOrganization={params.idOrganization}
                            idYear={params.idYear}
                        />
                    </Box>
                </div>
            </Section.Item>
        </Section.Root>
    )
}
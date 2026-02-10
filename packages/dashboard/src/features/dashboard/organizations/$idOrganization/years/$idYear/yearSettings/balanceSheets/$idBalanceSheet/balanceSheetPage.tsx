import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../../components/layouts/title.tsx"
import { balanceSheetRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.tsx"
import { DeleteOneBalanceSheet } from "./deleteOneBalanceSheet.tsx"
import { UpdateOneBalanceSheet } from "./updateOneBalanceSheet.tsx"


export function BalanceSheetPage() {
    const params = useParams({ from: balanceSheetRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneBalanceSheetRouteDefinition}
            body={{
                idOrganization: params.idOrganization,
                idYear: params.idYear,
                idBalanceSheet: params.idBalanceSheet,
            }}
        >
            {(balanceSheet) => {
                return (
                    <Section.Root>
                        <Section.Item className={css({ flexDirection: "row" })}>
                            <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                <LinkButton
                                    to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan"
                                    params={{
                                        idOrganization: balanceSheet.idOrganization,
                                        idYear: balanceSheet.idYear,
                                    }}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </LinkButton>
                            </div>
                            <div className={css({ ml: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                <UpdateOneBalanceSheet
                                    balanceSheet={balanceSheet}
                                >
                                    <ButtonContent
                                        variant="primary"
                                        leftIcon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneBalanceSheet>
                                <DeleteOneBalanceSheet
                                    balanceSheet={balanceSheet}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconTrash />}
                                        color="error"
                                    />
                                </DeleteOneBalanceSheet>
                            </div>
                        </Section.Item>
                        <Section.Item className={css({ flexDirection: "column" })}>
                            <DataBlock.Root>
                                <DataBlock.Header>
                                    <TitleComponent>
                                        Informations
                                    </TitleComponent>
                                </DataBlock.Header>
                                <DataBlock.Content>
                                    <DataBlock.Item label="Numéro">
                                        <FormatText>
                                            {balanceSheet.number.toString()}
                                        </FormatText>
                                    </DataBlock.Item>
                                    <DataBlock.Item label="Libellé">
                                        <FormatText>
                                            {balanceSheet.label}
                                        </FormatText>
                                    </DataBlock.Item>
                                </DataBlock.Content>
                            </DataBlock.Root>
                        </Section.Item>
                        <Section.Item>
                            <DataBlock.Root>
                                <DataBlock.Header>
                                    <TitleComponent>
                                        Métadonnées
                                    </TitleComponent>
                                </DataBlock.Header>
                                <DataBlock.Content>
                                    <DataBlock.Item label="Ajouté le">
                                        <FormatDateTime date={balanceSheet.createdAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Ajouté par">
                                                {!balanceSheet.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={balanceSheet.data.createdBy} />}
                                            </DataBlock.Item> */}
                                    <DataBlock.Item label="Modifié le">
                                        <FormatDateTime date={balanceSheet.lastUpdatedAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Modifié par">
                                                {!balanceSheet.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={balanceSheet.data.lastUpdatedBy} />}
                                            </DataBlock.Item> */}
                                    <DataBlock.Item label="Id">
                                        <FormatText>
                                            {balanceSheet.id}
                                        </FormatText>
                                    </DataBlock.Item>
                                </DataBlock.Content>
                            </DataBlock.Root>
                        </Section.Item>
                    </Section.Root>
                )
            }}
        </DataWrapper>
    )
}
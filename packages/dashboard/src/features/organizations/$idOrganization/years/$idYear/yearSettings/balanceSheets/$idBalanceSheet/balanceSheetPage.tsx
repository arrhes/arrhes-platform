import { ButtonOutline } from "#/components/buttons/buttonOutline.js"
import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { DeleteOneBalanceSheet } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/deleteOneBalanceSheet.js"
import { UpdateOneBalanceSheet } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/updateOneBalanceSheet.js"
import { balanceSheetRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.js"
import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"


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
                        <Section.Item className="flex-row">
                            <div className="flex justify-start items-center gap-2">
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/bilan"
                                    params={{
                                        idOrganization: balanceSheet.idOrganization,
                                        idYear: balanceSheet.idYear,
                                    }}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className="ml-auto flex justify-end items-center gap-2">
                                <UpdateOneBalanceSheet
                                    balanceSheet={balanceSheet}
                                >
                                    <ButtonPlain
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneBalanceSheet>
                                <DeleteOneBalanceSheet
                                    balanceSheet={balanceSheet}
                                >
                                    <ButtonOutline
                                        icon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneBalanceSheet>
                            </div>
                        </Section.Item>
                        <Section.Item className="flex-col">
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
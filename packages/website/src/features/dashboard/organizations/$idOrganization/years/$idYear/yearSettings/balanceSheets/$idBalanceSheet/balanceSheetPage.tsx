import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"

import { balanceSheetRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.tsx"
import { DeleteOneBalanceSheet } from "./deleteOneBalanceSheet.tsx"
import { UpdateOneBalanceSheet } from "./updateOneBalanceSheet.tsx"

export function BalanceSheetPage() {
    const params = useParams({ from: balanceSheetRoute.id })

    return (
        <Section.Root>
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
                        <>
                            <Section.Item className={css({ flexDirection: "row" })}>
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "2",
                                    })}
                                >
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan"
                                        params={{
                                            idOrganization: balanceSheet.idOrganization,
                                            idYear: balanceSheet.idYear,
                                        }}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                    </LinkButton>
                                </div>
                                <div
                                    className={css({
                                        ml: "auto",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "2",
                                    })}
                                >
                                    <UpdateOneBalanceSheet balanceSheet={balanceSheet}>
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneBalanceSheet>
                                    <DeleteOneBalanceSheet balanceSheet={balanceSheet}>
                                        <ButtonOutlineContent leftIcon={<IconTrash />} color="danger" />
                                    </DeleteOneBalanceSheet>
                                </div>
                            </Section.Item>
                            <Section.Item className={css({ flexDirection: "column" })}>
                                <DataBlock.Root>
                                    <DataBlock.Header title="Informations" />
                                    <DataBlock.Content>
                                        <DataBlock.Item label="Numéro">
                                            <FormatText>{balanceSheet.number.toString()}</FormatText>
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Libellé">
                                            <FormatText>{balanceSheet.label}</FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                            <Section.Item>
                                <DataBlock.Root>
                                    <DataBlock.Header title="Métadonnées" />
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
                                            <FormatText>{balanceSheet.id}</FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}

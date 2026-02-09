import { readOneRecordLabelRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../../components/layouts/title.tsx"
import { recordLabelRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelRoute.tsx"
import { DeleteOneRecordLabel } from "./deleteOneRecordLabel.tsx"
import { UpdateOneRecordLabel } from "./updateOneRecordLabel.tsx"


export function RecordLabelPage() {
    const params = useParams({ from: recordLabelRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneRecordLabelRouteDefinition}
            body={{
                idOrganization: params.idOrganization,
                idYear: params.idYear,
                idRecordLabel: params.idRecordLabel
            }}
        >
            {(recordLabel) => {
                return (
                    <Section.Root>
                        <Section.Item className={css({ flexDirection: "row" })}>
                            <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/catégories"
                                    params={{
                                        idOrganization: recordLabel.idOrganization,
                                        idYear: recordLabel.idYear,
                                    }}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className={css({ ml: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                <UpdateOneRecordLabel
                                    recordLabel={recordLabel}
                                >
                                    <ButtonContent
                                        variant="primary"
                                        leftIcon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneRecordLabel>
                                <DeleteOneRecordLabel
                                    recordLabel={recordLabel}
                                >
                                    <ButtonContent
                                        variant="default"
                                        leftIcon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneRecordLabel>
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
                                    <DataBlock.Item label="Libellé">
                                        <FormatText>
                                            {recordLabel.label}
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
                                        <FormatDateTime date={recordLabel.createdAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Ajouté par">
                                                        {!recordLabel.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={recordLabel.data.createdBy} />}
                                                    </DataBlock.Item> */}
                                    <DataBlock.Item label="Modifié le">
                                        <FormatDateTime date={recordLabel.lastUpdatedAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Modifié par">
                                                        {!recordLabel.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={recordLabel.data.lastUpdatedBy} />}
                                                    </DataBlock.Item> */}
                                    <DataBlock.Item label="Id">
                                        <FormatText>
                                            {recordLabel.id}
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
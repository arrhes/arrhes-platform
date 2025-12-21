import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { DeleteOneRecordLabel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/deleteOneRecordLabel.js"
import { UpdateOneRecordLabel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/updateOneRecordLabel.js"
import { recordLabelRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelRoute.js"
import { readOneRecordLabelRouteDefinition } from "@arrhes/metadata/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"


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
                        <Section.Item className="flex-row">
                            <div className="flex justify-start items-center gap-2">
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/catégories"
                                    params={{
                                        idOrganization: recordLabel.idOrganization,
                                        idYear: recordLabel.idYear,
                                    }}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className="ml-auto flex justify-end items-center gap-2">
                                <UpdateOneRecordLabel
                                    recordLabel={recordLabel}
                                >
                                    <ButtonPlainContent
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneRecordLabel>
                                <DeleteOneRecordLabel
                                    recordLabel={recordLabel}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneRecordLabel>
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
import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { DeleteOneJournal } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/deleteOneJournal.js"
import { UpdateOneJournal } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/updateOneJournal.js"
import { journalRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.js"
import { readOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"


export function JournalPage() {
    const params = useParams({ from: journalRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneJournalRouteDefinition}
            body={{
                idOrganization: params.idOrganization,
                idYear: params.idYear,
                idJournal: params.idJournal
            }}
        >
            {(journal) => {
                return (
                    <Section.Root>
                        <Section.Item className="flex-row">
                            <div className="flex justify-start items-center gap-2">
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/journaux"
                                    params={{
                                        idOrganization: journal.idOrganization,
                                        idYear: journal.idYear,
                                    }}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className="ml-auto flex justify-end items-center gap-2">
                                <UpdateOneJournal
                                    journal={journal}
                                >
                                    <ButtonPlainContent
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneJournal>
                                <DeleteOneJournal
                                    journal={journal}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneJournal>
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
                                    <DataBlock.Item label="Code">
                                        <FormatText>
                                            {journal.code}
                                        </FormatText>
                                    </DataBlock.Item>
                                    <DataBlock.Item label="Libellé">
                                        <FormatText>
                                            {journal.label}
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
                                        <FormatDateTime date={journal.createdAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Ajouté par">
                                                        {!journal.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={journal.data.createdBy} />}
                                                    </DataBlock.Item> */}
                                    <DataBlock.Item label="Modifié le">
                                        <FormatDateTime date={journal.lastUpdatedAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Modifié par">
                                                        {!journal.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={journal.data.lastUpdatedBy} />}
                                                    </DataBlock.Item> */}
                                    <DataBlock.Item label="Id">
                                        <FormatText>
                                            {journal.id}
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
import { readOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
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
import { journalRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.tsx"
import { DeleteOneJournal } from "./deleteOneJournal.tsx"
import { UpdateOneJournal } from "./updateOneJournal.tsx"


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
                        <Section.Item className={css({ flexDir: "row" })}>
                            <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/journaux"
                                    params={{
                                        idOrganization: journal.idOrganization,
                                        idYear: journal.idYear,
                                    }}
                                >
                                    <ButtonContent
                                        variant="default"
                                        icon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className={css({ ml: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                <UpdateOneJournal
                                    journal={journal}
                                >
                                    <ButtonContent
                                        variant="primary"
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneJournal>
                                <DeleteOneJournal
                                    journal={journal}
                                >
                                    <ButtonContent
                                        variant="default"
                                        icon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneJournal>
                            </div>
                        </Section.Item>
                        <Section.Item className={css({ flexDir: "column" })}>
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

import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js";
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js";
import { FormatNull } from "#/components/formats/formatNull.js";
import { Box } from "#/components/layouts/box.js";
import { DataWrapper } from "#/components/layouts/dataWrapper.js";
import { Section } from "#/components/layouts/section/section.js";
import { CreateOneJournal } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/createOneJournal.js";
import { GenerateJournals } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/journals/generateJournals.js";
import { journalsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.js";
import { readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes";
import { IconPlus } from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";


export function JournalsPage() {
    const params = useParams({ from: journalsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
                    <CreateOneJournal
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
                            text="Ajouter un journal"
                        />
                    </CreateOneJournal>
                    <GenerateJournals
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonOutlineContent
                            icon={<IconPlus />}
                            text="Générer les journaux par défaut"
                        />
                    </GenerateJournals>
                </div>
                <Box>
                    <DataWrapper
                        routeDefinition={readAllJournalsRouteDefinition}
                        body={{
                            idOrganization: params.idOrganization,
                            idYear: params.idYear
                        }}
                    >
                        {(journals) => {
                            const sortedJournals = journals.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

                            if (sortedJournals.length === 0) {
                                return (
                                    <FormatNull
                                        text="Aucun journal"
                                        className="p-2"
                                    />
                                )
                            }
                            return (
                                <div className="h-fit w-full flex flex-col justify-start items-start">
                                    {
                                        sortedJournals.map((journal) => (
                                            <Link
                                                key={journal.id}
                                                to="/organisations/$idOrganization/exercices/$idYear/paramètres/journaux/$idJournal"
                                                params={{
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idJournal: journal.id
                                                }}
                                                className="w-full p-2 border-b border-neutral/10 last:border-none flex justify-start items-center hover:bg-neutral/5 cursor-pointer"
                                            >
                                                {`${journal.label} (${journal.code})`}
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                        }}
                    </DataWrapper>
                </Box>
            </Section.Item>
        </Section.Root>
    )
}
import { readAllJournalsRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { journalsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.tsx"
import { CreateOneJournal } from "./createOneJournal.tsx"
import { GenerateJournals } from "./generateJournals.tsx"


export function JournalsPage() {
    const params = useParams({ from: journalsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                    <CreateOneJournal
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconPlus />}
                            text="Ajouter un journal"
                        />
                    </CreateOneJournal>
                    <GenerateJournals
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="default"
                            leftIcon={<IconPlus />}
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
                                        className={css({ p: "2" })}
                                    />
                                )
                            }
                            return (
                                <div className={css({ height: "fit", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
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
                                                className={css({ width: "100%", p: "2", borderBottomWidth: "1px", borderColor: "neutral/10", _last: { borderStyle: "none" }, display: "flex", justifyContent: "flex-start", alignItems: "center", _hover: { backgroundColor: "neutral/5" }, cursor: "pointer" })}
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

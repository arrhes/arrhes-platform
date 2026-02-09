import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { Box } from "../../../../../../../../components/layouts/box.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { recordLabelsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoute.tsx"
import { CreateOneRecordLabel } from "./createOneRecordLabel.tsx"


export function RecordLabelsPage() {
    const params = useParams({ from: recordLabelsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                    <CreateOneRecordLabel
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconPlus />}
                            text="Ajouter une catégorie"
                        />
                    </CreateOneRecordLabel>
                </div>
                <Box>
                    <DataWrapper
                        routeDefinition={readAllRecordLabelsRouteDefinition}
                        body={{
                            idOrganization: params.idOrganization,
                            idYear: params.idYear
                        }}
                    >
                        {(recordLabels) => {
                            const sortedRecordLabels = recordLabels.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

                            if (sortedRecordLabels.length === 0) {
                                return (
                                    <FormatNull
                                        text="Aucune catégorie"
                                        className={css({ p: "2" })}
                                    />
                                )
                            }
                            return (
                                <div className={css({ height: "fit-content", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                                    {
                                        sortedRecordLabels.map((recordLabel) => (
                                            <Link
                                                key={recordLabel.id}
                                                to="/organisations/$idOrganization/exercices/$idYear/paramètres/catégories/$idRecordLabel"
                                                params={{
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idRecordLabel: recordLabel.id
                                                }}
                                                className={css({ width: "100%", p: "2", borderBottom: "1px solid", borderColor: "neutral/10", _last: { borderBottom: "none" }, display: "flex", justifyContent: "flex-start", alignItems: "center", _hover: { backgroundColor: "neutral/5" }, cursor: "pointer" })}
                                            >
                                                {`${recordLabel.label}`}
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
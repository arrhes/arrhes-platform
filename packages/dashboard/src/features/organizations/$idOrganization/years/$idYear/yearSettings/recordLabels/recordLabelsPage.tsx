import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js";
import { FormatNull } from "#/components/formats/formatNull.js";
import { Box } from "#/components/layouts/box.js";
import { DataWrapper } from "#/components/layouts/dataWrapper.js";
import { Section } from "#/components/layouts/section/section.js";
import { CreateOneRecordLabel } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/createOneRecordLabel.js";
import { recordLabelsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoute.js";
import { readAllRecordLabelsRouteDefinition } from "@arrhes/application-metadata/routes";
import { IconPlus } from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";


export function RecordLabelsPage() {
    const params = useParams({ from: recordLabelsRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
                    <CreateOneRecordLabel
                        idOrganization={params.idOrganization}
                        idYear={params.idYear}
                    >
                        <ButtonPlainContent
                            icon={<IconPlus />}
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
                                        className="p-2"
                                    />
                                )
                            }
                            return (
                                <div className="h-fit w-full flex flex-col justify-start items-start">
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
                                                className="w-full p-2 border-b border-neutral/10 last:border-none flex justify-start items-center hover:bg-neutral/5 cursor-pointer"
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
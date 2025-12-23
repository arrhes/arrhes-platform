import { ButtonOutline } from "#/components/buttons/buttonOutline.js"
import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { ComputationIncomeStatementsTable } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/computationIncomeStatementTable.js"
import { DeleteOneComputation } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/deleteOneComputation.js"
import { UpdateOneComputation } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/updateOneComputation.js"
import { computationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.js"
import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"


export function ComputationPage() {
    const params = useParams({ from: computationLayoutRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneComputationRouteDefinition}
                body={{
                    idOrganization: params.idOrganization,
                    idYear: params.idYear,
                    idComputation: params.idComputation,
                }}
            >
                {(computation) => {
                    return (
                        <Fragment>
                            <Section.Item className="flex-row">
                                <div className="flex justify-start items-center gap-2">
                                    <Link
                                        to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs"
                                        params={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                        }}
                                    >
                                        <ButtonOutlineContent
                                            icon={<IconChevronLeft />}
                                            text="Retour"
                                        />
                                    </Link>
                                </div>
                                <div className="ml-auto flex justify-end items-center gap-2">
                                    <UpdateOneComputation
                                        computation={computation}
                                    >
                                        <ButtonPlain
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneComputation>
                                    <DeleteOneComputation
                                        computation={computation}
                                    >
                                        <ButtonOutline
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneComputation>
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
                                                {computation.number}
                                            </FormatText>
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Libellé">
                                            <FormatText>
                                                {computation.label}
                                            </FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                                <DataBlock.Root>
                                    <DataBlock.Header>
                                        <TitleComponent>
                                            Métadonnées
                                        </TitleComponent>
                                    </DataBlock.Header>
                                    <DataBlock.Content>
                                        <DataBlock.Item label="Ajouté le">
                                            <FormatDateTime date={computation.createdAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Modifié le">
                                            <FormatDateTime date={computation.lastUpdatedAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Id">
                                            <FormatText>
                                                {computation.id}
                                            </FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                            <Section.Item>
                                <ComputationIncomeStatementsTable
                                    computation={computation}
                                />
                            </Section.Item>
                        </Fragment>
                    )
                }}
            </DataWrapper >
        </Section.Root >
    )
}
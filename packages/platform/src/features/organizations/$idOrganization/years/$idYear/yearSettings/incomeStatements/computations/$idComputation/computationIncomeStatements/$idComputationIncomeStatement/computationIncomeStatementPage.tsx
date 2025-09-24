import { readOneComputationIncomeStatementRouteDefinition, readOneComputationRouteDefinition } from "@arrhes/schemas/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { ButtonOutline } from "components/buttons/buttonOutline"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatText } from "components/formats/formatText"
import { Chip } from "components/layouts/chip"
import { DataBlock } from "components/layouts/dataBlock/dataBlock"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { TitleComponent } from "components/layouts/title"
import { DeleteOneComputationIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/deleteOneComputationIncomeStatement"
import { UpdateOneComputationIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/updateOneComputationIncomeStatement"
import { Fragment } from "react/jsx-runtime"
import { computationIncomeStatementLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute"


export function ComputationIncomeStatementPage() {
    const params = useParams({ from: computationIncomeStatementLayoutRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneComputationIncomeStatementRouteDefinition}
                body={{
                    idOrganization: params.idOrganization,
                    idYear: params.idYear,
                    idComputationIncomeStatement: params.idComputationIncomeStatement,
                }}
            >
                {(computationIncomeStatement) => {
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
                                    <UpdateOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonPlain
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneComputationIncomeStatement>
                                    <DeleteOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonOutline
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneComputationIncomeStatement>
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
                                        <DataBlock.Item label="Poste du compte de résultat">
                                            <DataWrapper
                                                routeDefinition={readOneComputationRouteDefinition}
                                                body={{
                                                    idOrganization: computationIncomeStatement.idOrganization,
                                                    idYear: computationIncomeStatement.idYear,
                                                    idComputation: computationIncomeStatement.idComputation
                                                }}
                                            >
                                                {(computation) => (
                                                    <FormatText>
                                                        {`${computation.number} - ${computation.label}`}
                                                    </FormatText>
                                                )}
                                            </DataWrapper>
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Opération">
                                            <Chip
                                                text={(computationIncomeStatement.operation === "plus") ? "Addition" : "Soustraction"}
                                            />
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
                                            <FormatDateTime date={computationIncomeStatement.createdAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Modifié le">
                                            <FormatDateTime date={computationIncomeStatement.lastUpdatedAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Id">
                                            <FormatText>
                                                {computationIncomeStatement.id}
                                            </FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                        </Fragment>
                    )
                }}
            </DataWrapper >
        </Section.Root >
    )
}
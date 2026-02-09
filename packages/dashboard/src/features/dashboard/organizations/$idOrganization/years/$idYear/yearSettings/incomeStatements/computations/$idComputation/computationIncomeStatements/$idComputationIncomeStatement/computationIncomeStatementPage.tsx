import { readOneComputationIncomeStatementRouteDefinition, readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { FormatDateTime } from "../../../../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../../../../components/formats/formatText.tsx"
import { Chip } from "../../../../../../../../../../../../components/layouts/chip.tsx"
import { DataBlock } from "../../../../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../../../../../components/layouts/title.tsx"
import { computationIncomeStatementLayoutRoute } from "../../../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.tsx"
import { DeleteOneComputationIncomeStatement } from "./deleteOneComputationIncomeStatement.tsx"
import { UpdateOneComputationIncomeStatement } from "./updateOneComputationIncomeStatement.tsx"


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
                            <Section.Item className={css({ flexDirection: "row" })}>
                                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                    <Link
                                        to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs"
                                        params={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
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
                                    <UpdateOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <Button
                                            variant="primary"
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneComputationIncomeStatement>
                                    <DeleteOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <Button
                                            variant="default"
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneComputationIncomeStatement>
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
import {
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { FormatDateTime } from "../../../../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../../../../components/formats/formatText.tsx"
import { Chip } from "../../../../../../../../../../../../components/layouts/chip.tsx"
import { DataBlock } from "../../../../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../../../../../components/linkButton.tsx"

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
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "2",
                                    })}
                                >
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs"
                                        params={{
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                        }}
                                    >
                                        <ButtonContent variant="default" leftIcon={<IconChevronLeft />} text="Retour" />
                                    </LinkButton>
                                </div>
                                <div
                                    className={css({
                                        ml: "auto",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "2",
                                    })}
                                >
                                    <UpdateOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonContent variant="primary" leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneComputationIncomeStatement>
                                    <DeleteOneComputationIncomeStatement
                                        computationIncomeStatement={computationIncomeStatement}
                                    >
                                        <ButtonContent variant="default" leftIcon={<IconTrash />} color="error" />
                                    </DeleteOneComputationIncomeStatement>
                                </div>
                            </Section.Item>
                            <Section.Item className={css({ flexDirection: "column" })}>
                                <DataBlock.Root>
                                    <DataBlock.Header title="Informations" />
                                    <DataBlock.Content>
                                        <DataBlock.Item label="Poste du compte de résultat">
                                            <DataWrapper
                                                routeDefinition={readOneComputationRouteDefinition}
                                                body={{
                                                    idOrganization: computationIncomeStatement.idOrganization,
                                                    idYear: computationIncomeStatement.idYear,
                                                    idComputation: computationIncomeStatement.idComputation,
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
                                                text={
                                                    computationIncomeStatement.operation === "plus"
                                                        ? "Addition"
                                                        : "Soustraction"
                                                }
                                            />
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                                <DataBlock.Root>
                                    <DataBlock.Header title="Métadonnées" />
                                    <DataBlock.Content>
                                        <DataBlock.Item label="Ajouté le">
                                            <FormatDateTime date={computationIncomeStatement.createdAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Modifié le">
                                            <FormatDateTime date={computationIncomeStatement.lastUpdatedAt} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Id">
                                            <FormatText>{computationIncomeStatement.id}</FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                        </Fragment>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}

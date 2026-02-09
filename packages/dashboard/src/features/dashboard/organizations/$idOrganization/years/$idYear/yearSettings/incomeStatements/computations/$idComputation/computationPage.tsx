import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { FormatDateTime } from "../../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../../../components/layouts/title.tsx"
import { computationLayoutRoute } from "../../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"
import { ComputationIncomeStatementsTable } from "./computationIncomeStatements/computationIncomeStatementTable.tsx"
import { DeleteOneComputation } from "./deleteOneComputation.tsx"
import { UpdateOneComputation } from "./updateOneComputation.tsx"


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
                                    <UpdateOneComputation
                                        computation={computation}
                                    >
                                        <Button
                                            variant="primary"
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneComputation>
                                    <DeleteOneComputation
                                        computation={computation}
                                    >
                                        <Button
                                            variant="default"
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneComputation>
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
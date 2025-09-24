import { readOneIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { ButtonOutline } from "components/buttons/buttonOutline"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatText } from "components/formats/formatText"
import { DataBlock } from "components/layouts/dataBlock/dataBlock"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Section } from "components/layouts/section/section"
import { TitleComponent } from "components/layouts/title"
import { DeleteOneIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/deleteOneIncomeStatement"
import { UpdateOneIncomeStatement } from "features/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/updateOneIncomeStatement"
import { incomeStatementRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute"


export function IncomeStatementPage() {
    const params = useParams({ from: incomeStatementRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneIncomeStatementRouteDefinition}
            body={{
                idOrganization: params.idOrganization,
                idYear: params.idYear,
                idIncomeStatement: params.idIncomeStatement,
            }}
        >
            {(incomeStatement) => {
                return (
                    <Section.Root>
                        <Section.Item className="flex-row">
                            <div className="flex justify-start items-center gap-2">
                                <Link
                                    to="/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat"
                                    params={{
                                        idOrganization: incomeStatement.idOrganization,
                                        idYear: incomeStatement.idYear,
                                    }}
                                >
                                    <ButtonOutlineContent
                                        icon={<IconChevronLeft />}
                                        text="Retour"
                                    />
                                </Link>
                            </div>
                            <div className="ml-auto flex justify-end items-center gap-2">
                                <UpdateOneIncomeStatement
                                    incomeStatement={incomeStatement}
                                >
                                    <ButtonPlain
                                        icon={<IconPencil />}
                                        text="Modifier"
                                    />
                                </UpdateOneIncomeStatement>
                                <DeleteOneIncomeStatement
                                    incomeStatement={incomeStatement}
                                >
                                    <ButtonOutline
                                        icon={<IconTrash />}
                                        title="Supprimer"
                                        color="error"
                                    />
                                </DeleteOneIncomeStatement>
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
                                            {incomeStatement.number.toString()}
                                        </FormatText>
                                    </DataBlock.Item>
                                    <DataBlock.Item label="Libellé">
                                        <FormatText>
                                            {incomeStatement.label}
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
                                        <FormatDateTime date={incomeStatement.createdAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Ajouté par">
                                                {!incomeStatement.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={incomeStatement.data.createdBy} />}
                                            </DataBlock.Item> */}
                                    <DataBlock.Item label="Modifié le">
                                        <FormatDateTime date={incomeStatement.lastUpdatedAt} />
                                    </DataBlock.Item>
                                    {/* <DataBlock.Item label="Modifié par">
                                                {!incomeStatement.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={incomeStatement.data.lastUpdatedBy} />}
                                            </DataBlock.Item> */}
                                    <DataBlock.Item label="Id">
                                        <FormatText>
                                            {incomeStatement.id}
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
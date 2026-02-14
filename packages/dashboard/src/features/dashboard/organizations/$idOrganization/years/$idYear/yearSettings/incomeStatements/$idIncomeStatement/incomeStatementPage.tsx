import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"

import { incomeStatementRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute.tsx"
import { DeleteOneIncomeStatement } from "./deleteOneIncomeStatement.tsx"
import { UpdateOneIncomeStatement } from "./updateOneIncomeStatement.tsx"


export function IncomeStatementPage() {
    const params = useParams({ from: incomeStatementRoute.id })

    return (
        <Section.Root>
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
                        <>
                            <Section.Item className={css({ flexDirection: "row" })}>
                                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat"
                                        params={{
                                            idOrganization: incomeStatement.idOrganization,
                                            idYear: incomeStatement.idYear,
                                        }}
                                    >
                                        <ButtonContent
                                            variant="default"
                                            leftIcon={<IconChevronLeft />}
                                            text="Retour"
                                        />
                                    </LinkButton>
                                </div>
                                <div className={css({ ml: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                    <UpdateOneIncomeStatement
                                        incomeStatement={incomeStatement}
                                    >
                                        <ButtonContent
                                            variant="primary"
                                            leftIcon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneIncomeStatement>
                                    <DeleteOneIncomeStatement
                                        incomeStatement={incomeStatement}
                                    >
                                        <ButtonContent
                                            variant="default"
                                            leftIcon={<IconTrash />}
                                            color="error"
                                        />
                                    </DeleteOneIncomeStatement>
                                </div>
                            </Section.Item>
                            <Section.Item className={css({ flexDirection: "column" })}>
                                <DataBlock.Root>
                                    <DataBlock.Header title="Informations" />
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
                                    <DataBlock.Header title="Métadonnées" />
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
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
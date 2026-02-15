import { readOneAccountRouteDefinition, readOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatBoolean } from "../../../../../../../../../components/formats/formatBoolean.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatNull } from "../../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { recordRowRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowRoute.tsx"
import { DeleteOneRecordRow } from "./deleteOneRecordRow.tsx"
import { UpdateOneRecordRow } from "./updateOneRecordRow.tsx"


export function RecordRowPage() {
    const params = useParams({ from: recordRowRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneRecordRowRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                        idRecordRow: params.idRecordRow,
                    }}
                >
                    {(recordRow) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div className={css({ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2" })}>
                                        <LinkButton
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord"
                                            params={{
                                                idOrganization: recordRow.idOrganization,
                                                idYear: recordRow.idYear,
                                                idRecord: recordRow.idRecord,
                                            }}
                                        >
                                            <ButtonContent
                                                variant="default"
                                                leftIcon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </LinkButton>
                                        <div className={css({ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                            <UpdateOneRecordRow
                                                recordRow={recordRow}
                                            >
                                                <ButtonContent
                                                    variant="primary"
                                                    leftIcon={<IconPencil />}
                                                    text="Modifier"
                                                />
                                            </UpdateOneRecordRow>
                                            <DeleteOneRecordRow
                                                recordRow={recordRow}
                                            >
                                                <ButtonContent
                                                    variant="default"
                                                    leftIcon={<IconTrash />}
                                                    color="error"
                                                />
                                            </DeleteOneRecordRow>
                                        </div>
                                    </div>
                                </Section.Item>
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Informations" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>
                                                    {recordRow.label}
                                                </FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Compte">
                                                {(recordRow.idAccount === null)
                                                    ? (<FormatNull />)
                                                    : (
                                                        <DataWrapper
                                                            routeDefinition={readOneAccountRouteDefinition}
                                                            body={{
                                                                idOrganization: params.idOrganization,
                                                                idYear: params.idYear,
                                                                idAccount: recordRow.idAccount,
                                                            }}
                                                        >
                                                            {(account) => (
                                                                <span>
                                                                    {`${account.number} - ${account.label}`}
                                                                </span>
                                                            )}
                                                        </DataWrapper>
                                                    )
                                                }
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Débit">
                                                <FormatPrice price={recordRow.debit} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Crédit">
                                                <FormatPrice price={recordRow.credit} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Calculé pour le journal ?">
                                                <FormatBoolean boolean={recordRow.isComputedForJournalReport} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Calculé pour le grand-livre ?">
                                                <FormatBoolean boolean={recordRow.isComputedForLedgerReport} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Calculé pour la balance ?">
                                                <FormatBoolean boolean={recordRow.isComputedForBalanceReport} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Calculé pour le bilan ?">
                                                <FormatBoolean boolean={recordRow.isComputedForBalanceSheetReport} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Calculé pour le compte de résultat ?">
                                                <FormatBoolean boolean={recordRow.isComputedForIncomeStatementReport} />
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Métadonnées" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={recordRow.createdAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={recordRow.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Id">
                                                <FormatText>
                                                    {recordRow.id}
                                                </FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            </Section.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
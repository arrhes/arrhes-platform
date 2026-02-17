import {
    readAllRecordRowsRouteDefinition,
    readOneFileRouteDefinition,
    readOneJournalRouteDefinition,
    readOneRecordLabelRouteDefinition,
    readOneRecordRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconCopyCheck, IconEdit, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice, formatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Banner } from "../../../../../../../../components/layouts/banner.tsx"
import { DataBlock } from "../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../components/linkButton.js"
import { recordRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.tsx"
import { compareAmounts } from "../../../../../../../../utilities/compareAmounts.ts"
import { CreateOneRecordRow } from "./createOneRecordRow.tsx"
import { DeleteOneRecord } from "./deleteOneRecord.tsx"
import { DuplicateOneRecord } from "./duplicateOneRecord.tsx"
import { RecordRowsTable } from "./recordRowsTable.tsx"
import { UpdateManyRecordRows } from "./updateManyRecordRows.tsx"
import { UpdateOneRecord } from "./updateOneRecord.tsx"

export function RecordPage() {
    const params = useParams({ from: recordRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneRecordRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                        idRecord: params.idRecord,
                    }}
                >
                    {(record) => {
                        return (
                            <DataWrapper
                                routeDefinition={readAllRecordRowsRouteDefinition}
                                body={{
                                    idOrganization: params.idOrganization,
                                    idYear: params.idYear,
                                    idRecord: params.idRecord,
                                }}
                            >
                                {(recordRows) => {
                                    let totalDebit = 0
                                    let totalCredit = 0

                                    recordRows.forEach((recordRow) => {
                                        totalDebit += Number(recordRow.debit)
                                        totalCredit += Number(recordRow.credit)
                                    })

                                    return (
                                        <Section.Root>
                                            <Section.Item>
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-start",
                                                        gap: "2",
                                                    })}
                                                >
                                                    <LinkButton
                                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures"
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
                                                    </LinkButton>
                                                    <div
                                                        className={css({
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            alignItems: "center",
                                                            gap: "2",
                                                        })}
                                                    >
                                                        <UpdateOneRecord record={record}>
                                                            <ButtonContent
                                                                variant="primary"
                                                                leftIcon={<IconPencil />}
                                                                text="Modifier"
                                                            />
                                                        </UpdateOneRecord>
                                                        <DuplicateOneRecord record={record}>
                                                            <ButtonContent
                                                                variant="default"
                                                                leftIcon={<IconCopyCheck />}
                                                                text="Dupliquer"
                                                            />
                                                        </DuplicateOneRecord>
                                                        <DeleteOneRecord record={record}>
                                                            <ButtonContent
                                                                variant="default"
                                                                leftIcon={<IconTrash />}
                                                                title="Supprimer"
                                                                color="error"
                                                            />
                                                        </DeleteOneRecord>
                                                        {/* <ComputeRecord record={record.data}>
                                <ButtonOutline
                                    text={!record.data.isComputed ? "Simuler" : "Ne plus simuler"}
                                    icon={<IconCalculator />}
                                    color="information"
                                />
                            </ComputeRecord> */}
                                                        {/* <DuplicateRecord record={record.data}>
                                <ButtonOutline
                                    text="Dupliquer"
                                    icon={<IconCopy />}
                                />
                            </DuplicateRecord> */}
                                                    </div>
                                                </div>
                                            </Section.Item>
                                            <Section.Item className={css({ padding: "0" })}>
                                                {record.idFile === null ? null : (
                                                    <Banner variant="error">Il manque une pièce justificative.</Banner>
                                                )}
                                                {compareAmounts({
                                                    a: totalDebit,
                                                    b: totalCredit,
                                                }) ? null : (
                                                    <Banner variant="error">
                                                        Les montants au débit et au crédit sont différents, veuillez
                                                        corriger pour pouvoir valider. (
                                                        {formatPrice({ price: totalDebit - totalCredit })})
                                                    </Banner>
                                                )}
                                            </Section.Item>
                                            <Section.Item className={css({ flexDirection: "column" })}>
                                                <DataBlock.Root>
                                                    <DataBlock.Header title="Informations" />
                                                    <DataBlock.Content>
                                                        <DataBlock.Item label="Libellé">
                                                            <FormatText>{record.label}</FormatText>
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Date">
                                                            <FormatDate date={record.date} />
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Journal">
                                                            {record.idJournal === null ? (
                                                                <FormatNull />
                                                            ) : (
                                                                <DataWrapper
                                                                    routeDefinition={readOneJournalRouteDefinition}
                                                                    body={{
                                                                        idOrganization: params.idOrganization,
                                                                        idYear: params.idYear,
                                                                        idJournal: record.idJournal,
                                                                    }}
                                                                >
                                                                    {(journal) => (
                                                                        <FormatText>
                                                                            {`(${journal.code}) ${journal.label}`}
                                                                        </FormatText>
                                                                    )}
                                                                </DataWrapper>
                                                            )}
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Catégorie">
                                                            {record.idRecordLabel === null ? (
                                                                <FormatNull />
                                                            ) : (
                                                                <DataWrapper
                                                                    routeDefinition={readOneRecordLabelRouteDefinition}
                                                                    body={{
                                                                        idOrganization: params.idOrganization,
                                                                        idYear: params.idYear,
                                                                        idRecordLabel: record.idRecordLabel,
                                                                    }}
                                                                >
                                                                    {(recordLabel) => (
                                                                        <FormatText>{`${recordLabel.label}`}</FormatText>
                                                                    )}
                                                                </DataWrapper>
                                                            )}
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Pièce justificative">
                                                            {record.idFile === null ? (
                                                                <FormatNull />
                                                            ) : (
                                                                <DataWrapper
                                                                    routeDefinition={readOneFileRouteDefinition}
                                                                    body={{
                                                                        idOrganization: params.idOrganization,
                                                                        idYear: params.idYear,
                                                                        idFile: record.idFile,
                                                                    }}
                                                                >
                                                                    {(file) => (
                                                                        <FormatText>{file.reference}</FormatText>
                                                                    )}
                                                                </DataWrapper>
                                                            )}
                                                        </DataBlock.Item>
                                                    </DataBlock.Content>
                                                </DataBlock.Root>
                                                <DataBlock.Root>
                                                    <DataBlock.Header title="Détail" />
                                                    <DataBlock.Content>
                                                        {/* <DataBlock.Item label="Écriture simulée ?">
                                                            <FormatBoolean boolean={record.isComputed} />
                                                        </DataBlock.Item> */}
                                                        <DataBlock.Item label="Total débit">
                                                            <FormatPrice price={totalDebit} />
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Total crédit">
                                                            <FormatPrice price={totalCredit} />
                                                        </DataBlock.Item>
                                                    </DataBlock.Content>
                                                </DataBlock.Root>
                                                <DataBlock.Root>
                                                    <DataBlock.Header title="Métadonnées" />
                                                    <DataBlock.Content>
                                                        <DataBlock.Item label="Ajoutée le">
                                                            <FormatDateTime date={record.createdAt} />
                                                        </DataBlock.Item>
                                                        {/* <DataBlock.Item label="Ajoutée par">
                                                            {!record.data.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={record.data.createdBy} />}
                                                        </DataBlock.Item> */}
                                                        <DataBlock.Item label="Modifiée le">
                                                            <FormatDateTime date={record.lastUpdatedAt} />
                                                        </DataBlock.Item>
                                                        {/* <DataBlock.Item label="Modifiée par">
                                                            {!record.data.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={record.data.lastUpdatedBy} />}
                                                        </DataBlock.Item> */}
                                                        <DataBlock.Item label="Id">
                                                            <FormatText>{record.id}</FormatText>
                                                        </DataBlock.Item>
                                                    </DataBlock.Content>
                                                </DataBlock.Root>
                                            </Section.Item>
                                            <Section.Item>
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                        alignItems: "center",
                                                        gap: "0.5rem",
                                                    })}
                                                >
                                                    <CreateOneRecordRow record={record}>
                                                        <ButtonContent
                                                            variant="primary"
                                                            leftIcon={<IconPlus />}
                                                            text="Ajouter un mouvement"
                                                        />
                                                    </CreateOneRecordRow>
                                                    <UpdateManyRecordRows record={record}>
                                                        <ButtonContent
                                                            variant="default"
                                                            leftIcon={<IconEdit />}
                                                            text="Modifier plusieurs mouvements"
                                                        />
                                                    </UpdateManyRecordRows>
                                                </div>
                                                <RecordRowsTable record={record} recordRows={recordRows} />
                                            </Section.Item>
                                        </Section.Root>
                                    )
                                }}
                            </DataWrapper>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}

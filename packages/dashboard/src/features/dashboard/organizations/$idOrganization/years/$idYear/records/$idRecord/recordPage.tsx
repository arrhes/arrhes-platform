import { readAllRecordRowsRouteDefinition, readOneAttachmentRouteDefinition, readOneJournalRouteDefinition, readOneRecordLabelRouteDefinition, readOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconCopyCheck, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { formatPrice, FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Banner } from "../../../../../../../../components/layouts/banner.tsx"
import { DataBlock } from "../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../components/layouts/title.tsx"
import { recordRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.tsx"
import { compareAmounts } from "../../../../../../../../utilities/compareAmounts.ts"
import { DeleteOneRecord } from "./deleteOneRecord.tsx"
import { DuplicateOneRecord } from "./duplicateOneRecord.tsx"
import { RecordRowsTable } from "./recordRowsTable.tsx"
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
                                                <div className={css({ w: "full", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2" })}>
                                                    <Link
                                                        to="/organisations/$idOrganization/exercices/$idYear/écritures"
                                                        params={{
                                                            idOrganization: params.idOrganization,
                                                            idYear: params.idYear,
                                                        }}
                                                    >
                                                        <ButtonContent
                                                            variant="default"
                                                            icon={<IconChevronLeft />}
                                                            text="Retour"
                                                        />
                                                    </Link>
                                                    <div className={css({ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                                        <UpdateOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonContent
                                                                variant="primary"
                                                                icon={<IconPencil />}
                                                                text="Modifier"
                                                            />
                                                        </UpdateOneRecord>
                                                        <DuplicateOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonContent
                                                                variant="default"
                                                                icon={<IconCopyCheck />}
                                                                text="Dupliquer"
                                                            />
                                                        </DuplicateOneRecord>
                                                        <DeleteOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonContent
                                                                variant="default"
                                                                icon={<IconTrash />}
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
                                            <Section.Item className={css({ p: "0" })}>
                                                {
                                                    (record.idAttachment === null)
                                                        ? (null)
                                                        : (
                                                            <Banner variant="error">
                                                                Il manque une pièce justificative.
                                                            </Banner>
                                                        )
                                                }
                                                {
                                                    compareAmounts({
                                                        a: totalDebit,
                                                        b: totalCredit,
                                                    })
                                                        ? (null)
                                                        : (
                                                            <Banner variant="error">
                                                                Les montants au débit et au crédit sont différents, veuillez corriger pour pouvoir valider. ({formatPrice({ price: totalDebit - totalCredit })})
                                                            </Banner>
                                                        )
                                                }
                                            </Section.Item>
                                            <Section.Item className={css({ flexDir: "column" })}>
                                                <DataBlock.Root>
                                                    <DataBlock.Header>
                                                        <TitleComponent>
                                                            Informations
                                                        </TitleComponent>
                                                    </DataBlock.Header>
                                                    <DataBlock.Content>
                                                        <DataBlock.Item label="Libellé">
                                                            <FormatText>
                                                                {record.label}
                                                            </FormatText>
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Date">
                                                            <FormatDate date={record.date} />
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Journal">
                                                            {(record.idJournal === null)
                                                                ? (<FormatNull />)
                                                                : (
                                                                    <DataWrapper
                                                                        routeDefinition={readOneJournalRouteDefinition}
                                                                        body={{
                                                                            idOrganization: params.idOrganization,
                                                                            idYear: params.idYear,
                                                                            idJournal: record.idJournal
                                                                        }}
                                                                    >
                                                                        {(journal) => (
                                                                            <span>
                                                                                {`(${journal.code}) ${journal.label}`}
                                                                            </span>
                                                                        )}
                                                                    </DataWrapper>
                                                                )
                                                            }
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Catégorie">
                                                            {(record.idRecordLabel === null)
                                                                ? (<FormatNull />)
                                                                : (
                                                                    <DataWrapper
                                                                        routeDefinition={readOneRecordLabelRouteDefinition}
                                                                        body={{
                                                                            idOrganization: params.idOrganization,
                                                                            idYear: params.idYear,
                                                                            idRecordLabel: record.idRecordLabel
                                                                        }}
                                                                    >
                                                                        {(recordLabel) => (
                                                                            <span>
                                                                                {`${recordLabel.label}`}
                                                                            </span>
                                                                        )}
                                                                    </DataWrapper>
                                                                )
                                                            }
                                                        </DataBlock.Item>
                                                        <DataBlock.Item label="Pièce justificative">
                                                            {(record.idAttachment === null)
                                                                ? (<FormatNull />)
                                                                : (
                                                                    <DataWrapper
                                                                        routeDefinition={readOneAttachmentRouteDefinition}
                                                                        body={{
                                                                            idOrganization: params.idOrganization,
                                                                            idYear: params.idYear,
                                                                            idAttachment: record.idAttachment
                                                                        }}
                                                                    >
                                                                        {(attachment) => (
                                                                            <span>
                                                                                {attachment.reference}
                                                                            </span>
                                                                        )}
                                                                    </DataWrapper>
                                                                )
                                                            }
                                                        </DataBlock.Item>
                                                    </DataBlock.Content>
                                                </DataBlock.Root>
                                                <DataBlock.Root>
                                                    <DataBlock.Header>
                                                        <TitleComponent>
                                                            Détail
                                                        </TitleComponent>
                                                    </DataBlock.Header>
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
                                                    <DataBlock.Header>
                                                        <TitleComponent>
                                                            Métadonnées
                                                        </TitleComponent>
                                                    </DataBlock.Header>
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
                                                            <FormatText>
                                                                {record.id}
                                                            </FormatText>
                                                        </DataBlock.Item>
                                                    </DataBlock.Content>
                                                </DataBlock.Root>
                                            </Section.Item>
                                            <Section.Item>
                                                <RecordRowsTable
                                                    record={record}
                                                    recordRows={recordRows}
                                                />
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
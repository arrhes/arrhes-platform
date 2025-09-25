import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { FormatDate } from "#/components/formats/formatDate.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatNull } from "#/components/formats/formatNull.js"
import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Banner } from "#/components/layouts/banner.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Page } from "#/components/layouts/page/page.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { DeleteOneRecord } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/deleteOneRecord.js"
import { DuplicateOneRecord } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/duplicateOneRecord.js"
import { RecordRowsTable } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRowsTable.js"
import { UpdateOneRecord } from "#/features/organizations/$idOrganization/years/$idYear/records/$idRecord/updateOneRecord.js"
import { recordRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.js"
import { compareAmounts } from "#/utilities/compareAmounts.js"
import { readAllRecordRowsRouteDefinition, readOneAttachmentRouteDefinition, readOneJournalRouteDefinition, readOneRecordRouteDefinition } from "@arrhes/metadata/routes"
import { IconChevronLeft, IconCopyCheck, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"


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
                                                <div className="w-full flex justify-between items-start gap-2">
                                                    <Link
                                                        to="/organisations/$idOrganization/exercices/$idYear/écritures"
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
                                                    <div className="flex justify-end items-center gap-2">
                                                        <UpdateOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonPlainContent
                                                                icon={<IconPencil />}
                                                                text="Modifier"
                                                            />
                                                        </UpdateOneRecord>
                                                        <DeleteOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonOutlineContent
                                                                icon={<IconTrash />}
                                                                title="Supprimer"
                                                                color="error"
                                                            />
                                                        </DeleteOneRecord>
                                                        <DuplicateOneRecord
                                                            record={record}
                                                        >
                                                            <ButtonOutlineContent
                                                                icon={<IconCopyCheck />}
                                                                text="Dupliquer"
                                                            />
                                                        </DuplicateOneRecord>
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
                                            <Section.Item className="p-0">
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
                                                                Les montants au débit et au crédit sont différents, veuillez corriger pour pouvoir valider.
                                                            </Banner>
                                                        )
                                                }
                                            </Section.Item>
                                            <Section.Item className="flex-col">
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
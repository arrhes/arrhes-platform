import {
    readAllAccountsRouteDefinition,
    readAllRecordRowsRouteDefinition,
    readOneFileRouteDefinition,
    readOneJournalRouteDefinition,
    readOneRecordLabelRouteDefinition,
    readOneRecordRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconCopyCheck, IconEdit, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatError } from "../../../../../../../../components/formats/formatError.tsx"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice, formatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Banner } from "../../../../../../../../components/layouts/banner.tsx"
import { DataBlock } from "../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../components/linkButton.js"
import { recordRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.tsx"
import { compareAmounts } from "../../../../../../../../utilities/compareAmounts.ts"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.js"
import { CreateOneRecordRow } from "./createOneRecordRow.tsx"
import { DeleteOneRecord } from "./deleteOneRecord.tsx"
import { DuplicateOneRecord } from "./duplicateOneRecord.tsx"
import { RecordRowsTable } from "./recordRowsTable.tsx"
import { UpdateManyRecordRows } from "./updateManyRecordRows.tsx"
import { UpdateOneRecord } from "./updateOneRecord.tsx"

export function RecordPage() {
    const params = useParams({ from: recordRoute.id })

    const recordQuery = useDataFromAPI({
        routeDefinition: readOneRecordRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
                idRecord: params.idRecord,
            }),
            [params.idYear, params.idRecord],
        ),
    })

    const recordRowsQuery = useDataFromAPI({
        routeDefinition: readAllRecordRowsRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
                idRecord: params.idRecord,
            }),
            [params.idYear, params.idRecord],
        ),
    })

    const accountsQuery = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
            }),
            [params.idYear],
        ),
    })

    const journalQuery = useDataFromAPI({
        routeDefinition: readOneJournalRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
                idJournal: recordQuery.data?.idJournal ?? "",
            }),
            [params.idYear, recordQuery.data?.idJournal],
        ),
        enabled: recordQuery.data?.idJournal != null,
    })

    const recordLabelQuery = useDataFromAPI({
        routeDefinition: readOneRecordLabelRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
                idRecordLabel: recordQuery.data?.idRecordLabel ?? "",
            }),
            [params.idYear, recordQuery.data?.idRecordLabel],
        ),
        enabled: recordQuery.data?.idRecordLabel != null,
    })

    const fileQuery = useDataFromAPI({
        routeDefinition: readOneFileRouteDefinition,
        body: useMemo(
            () => ({
                idYear: params.idYear,
                idFile: recordQuery.data?.idFile ?? "",
            }),
            [params.idYear, recordQuery.data?.idFile],
        ),
        enabled: recordQuery.data?.idFile != null,
    })

    const isPending = recordQuery.isPending || recordRowsQuery.isPending || accountsQuery.isPending

    const isError =
        recordQuery.data === undefined || recordRowsQuery.data === undefined || accountsQuery.data === undefined

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const record = recordQuery.data
    const recordRows = recordRowsQuery.data
    const accounts = accountsQuery.data

    const accountsMap = new Map(accounts.map((account) => [account.id, account]))

    let totalDebit = 0
    let totalCredit = 0

    for (const recordRow of recordRows) {
        totalDebit += Number(recordRow.debit)
        totalCredit += Number(recordRow.credit)
    }

    return (
        <Page.Root>
            <Page.Content>
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
                                <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
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
                                    <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                </UpdateOneRecord>
                                <DuplicateOneRecord record={record}>
                                    <ButtonOutlineContent leftIcon={<IconCopyCheck />} text="Dupliquer" />
                                </DuplicateOneRecord>
                                <DeleteOneRecord record={record}>
                                    <ButtonOutlineContent leftIcon={<IconTrash />} title="Supprimer" color="danger" />
                                </DeleteOneRecord>
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
                                Les montants au débit et au crédit sont différents, veuillez corriger pour pouvoir
                                valider. ({formatPrice({ price: totalDebit - totalCredit })})
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
                                    ) : journalQuery.data ? (
                                        <FormatText>
                                            {`(${journalQuery.data.code}) ${journalQuery.data.label}`}
                                        </FormatText>
                                    ) : journalQuery.isPending ? (
                                        <FormatText>...</FormatText>
                                    ) : (
                                        <FormatNull />
                                    )}
                                </DataBlock.Item>
                                <DataBlock.Item label="Catégorie">
                                    {record.idRecordLabel === null ? (
                                        <FormatNull />
                                    ) : recordLabelQuery.data ? (
                                        <FormatText>{`${recordLabelQuery.data.label}`}</FormatText>
                                    ) : recordLabelQuery.isPending ? (
                                        <FormatText>...</FormatText>
                                    ) : (
                                        <FormatNull />
                                    )}
                                </DataBlock.Item>
                                <DataBlock.Item label="Pièce justificative">
                                    {record.idFile === null ? (
                                        <FormatNull />
                                    ) : fileQuery.data ? (
                                        <FormatText>{fileQuery.data.reference}</FormatText>
                                    ) : fileQuery.isPending ? (
                                        <FormatText>...</FormatText>
                                    ) : (
                                        <FormatNull />
                                    )}
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                        <DataBlock.Root>
                            <DataBlock.Header title="Détail" />
                            <DataBlock.Content>
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
                                <DataBlock.Item label="Modifiée le">
                                    <FormatDateTime date={record.lastUpdatedAt} />
                                </DataBlock.Item>
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
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter un mouvement" />
                            </CreateOneRecordRow>
                            <UpdateManyRecordRows record={record}>
                                <ButtonOutlineContent leftIcon={<IconEdit />} text="Modifier plusieurs mouvements" />
                            </UpdateManyRecordRows>
                        </div>
                        <RecordRowsTable record={record} recordRows={recordRows} accounts={accountsMap} />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}

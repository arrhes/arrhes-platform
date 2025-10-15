import { dbClient } from "#/dbClient.js"
import { insertMany } from "#/utilities/insertMany.js"
import { insertOne } from "#/utilities/insertOne.js"
import { models } from "@arrhes/metadata/models"
import { generateId } from "@arrhes/metadata/utilities"


const { default: rawRecords }: {
    default: Array<{
        id: string

        id_organization: string
        id_year: string

        id_journal: string | null
        id_attachment: string | null
        id_automatic: string | null
        is_validated: boolean
        is_computed: boolean
        validated_on: string | null
        label: string
        date: string

        created_on: string
        last_updated_on: string | null
        created_by: string | null
        last_updated_by: string | null
    }>
} = await import('./done/records.json', { with: { type: 'json' } })

const { default: rawRows }: {
    default: Array<{
        id: string

        id_organization: string
        id_year: string

        id_record: string
        id_account: string
        label: string
        debit: string
        credit: string

        created_on: string
        last_updated_on: string | null
        created_by: string | null
        last_updated_by: string | null
    }>
} = await import('./done/rows.json', { with: { type: 'json' } })

const { default: rawAccounts }: {
    default: Array<{
        id: string

        id_organization: string
        id_year: string
        id_parent: string | null

        is_class: boolean
        is_selectable: boolean
        is_default: boolean
        label: string
        number: number
        type: string
        is_mandatory: boolean

        created_on: string
        last_updated_on: string | null
        created_by: string | null
        last_updated_by: string | null
    }>
} = await import('./done/accounts.json', { with: { type: 'json' } })

const { default: rawOrganizations }: {
    default: Array<{
        id: string

        scope: string
        siren: string | null
        name: string
        email: string | null

        created_on: string
        last_updated_on: string
    }>
} = await import('./done/organizations.json', { with: { type: 'json' } })

const { default: rawYears }: {
    default: Array<{
        id: string

        id_organization: string
        id_previous_year: string | null
        is_closed: boolean
        closed_on: string | null
        label: string | null
        starting_on: string
        ending_on: string

        created_on: string
        last_updated_on: string | null
        created_by: string | null
        last_updated_by: string | null
    }>
} = await import('./done/years.json', { with: { type: 'json' } })

async function migration() {
    try {
        const CHUNK_SIZE = 1000

        function replaceIdOrganization(idOrganization: string) {
            if (idOrganization === "szwra6gp9i05zrb485n4qg") {
                return "lt9m-dvre-y2s2-2fj6"
            }
            return idOrganization
        }

        console.log("Add organizations and organizationUsers")
        try {
            await insertOne({
                database: dbClient,
                table: models.organization,
                data: {
                    id: "g2yrp2e2x7lddcliw8yusa",
                    isArchived: false,
                    scope: "company",
                    siren: "908719503",
                    name: "Barbote",
                    email: "root@barbote.com",
                    createdAt: "2024-06-21 17:32:24+00",
                    lastUpdatedAt: "2024-06-21 17:32:24+00",
                    createdBy: null,
                    lastUpdatedBy: null,
                }
            })

            await insertOne({
                database: dbClient,
                table: models.organizationUser,
                data: {
                    id: generateId(),

                    idOrganization: "g2yrp2e2x7lddcliw8yusa",
                    idUser: "t2jp-upcc-4n25-cdsr",
                    isAdmin: true,
                    status: "active" as "active",

                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: new Date().toISOString(),
                    createdBy: null,
                    lastUpdatedBy: null,
                }
            })
        }
        catch (error) {

        }


        console.log("Add years")
        try {
            const createManyYears = await insertMany({
                database: dbClient,
                table: models.year,
                data: rawYears.map((rawYear) => ({
                    id: rawYear.id,

                    idOrganization: replaceIdOrganization(rawYear.id_organization),
                    idYearPrevious: rawYear.id_previous_year,
                    isClosed: rawYear.is_closed,
                    closedAt: rawYear.closed_on,
                    label: rawYear.label ?? `Exercice ${new Date(rawYear.starting_on).getFullYear()}`,
                    startingAt: rawYear.starting_on,
                    endingAt: rawYear.ending_on,

                    createdAt: rawYear.created_on,
                    lastUpdatedAt: rawYear.last_updated_on,
                    createdBy: null,
                    lastUpdatedBy: null,
                }))
            })
        }
        catch (error) {

        }


        console.log("Add accounts")
        try {
            for (let i = 0; i < rawAccounts.length; i += CHUNK_SIZE) {
                const chunk = rawAccounts.slice(i, i + CHUNK_SIZE)
                await insertMany({
                    database: dbClient,
                    table: models.account,
                    data: chunk.map((rawAccount) => {
                        return ({
                            id: rawAccount.id,

                            idOrganization: replaceIdOrganization(rawAccount.id_organization),
                            idYear: rawAccount.id_year,
                            idAccountParent: rawAccount.id_parent,

                            idBalanceSheetAsset: null,
                            balanceSheetAssetColumn: null,
                            idBalanceSheetLiability: null,
                            balanceSheetLiabilityColumn: null,

                            idIncomeStatement: null,

                            isClass: rawAccount.is_class,
                            isSelectable: rawAccount.is_selectable,
                            isDefault: rawAccount.is_default,
                            label: rawAccount.label,
                            number: rawAccount.number.toString(),
                            type: {
                                sheet: "balance-sheet" as const,
                                statement: "income-statement" as const,
                                special: "special" as const,
                            }[rawAccount.type] ?? "special",
                            isMandatory: rawAccount.is_mandatory,

                            createdAt: rawAccount.created_on,
                            lastUpdatedAt: rawAccount.last_updated_on,
                            createdBy: null,
                            lastUpdatedBy: null,
                        })
                    })
                })
            }
        }
        catch (error) {

        }


        console.log("Add records")
        try {
            for (let i = 0; i < rawRecords.length; i += CHUNK_SIZE) {
                const chunk = rawRecords.slice(i, i + CHUNK_SIZE)
                await insertMany({
                    database: dbClient,
                    table: models.record,
                    data: chunk.map((rawRecord) => ({
                        id: rawRecord.id,

                        idOrganization: replaceIdOrganization(rawRecord.id_organization),
                        idYear: rawRecord.id_year,
                        idJournal: null,
                        idAttachment: null,
                        isComputed: rawRecord.is_computed,
                        label: rawRecord.label,
                        date: rawRecord.date,

                        createdAt: rawRecord.created_on,
                        lastUpdatedAt: rawRecord.last_updated_on,
                        createdBy: null,
                        lastUpdatedBy: null,
                    }))
                })
            }
        }
        catch (error) {

        }


        console.log("Add recordRows")
        try {
            for (let i = 0; i < rawRows.length; i += CHUNK_SIZE) {
                const chunk = rawRows.slice(i, i + CHUNK_SIZE)
                await insertMany({
                    database: dbClient,
                    table: models.recordRow,
                    data: chunk.map((rawRow) => ({
                        id: rawRow.id,

                        idOrganization: replaceIdOrganization(rawRow.id_organization),
                        idYear: rawRow.id_year,
                        idRecord: rawRow.id_record,
                        idAccount: rawRow.id_account,
                        isComputedForJournalReport: true,
                        isComputedForLedgerReport: true,
                        isComputedForBalanceReport: true,
                        isComputedForBalanceSheetReport: true,
                        isComputedForIncomeStatementReport: true,
                        label: rawRow.label,
                        debit: rawRow.debit ?? "0.00",
                        credit: rawRow.credit ?? "0.00",

                        createdAt: rawRow.created_on,
                        lastUpdatedAt: rawRow.last_updated_on,
                        createdBy: null,
                        lastUpdatedBy: null,
                    }))
                })
            }
        }
        catch (error) {

        }
    }
    catch (error) {
        console.log(error)
    }
}

await migration()
process.exit()

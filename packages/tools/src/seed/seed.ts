import {
    defaultJournals,
    defaultCompanyAccounts,
    defaultCompanyBalanceSheets,
    defaultCompanyIncomeStatements,
    defaultComputations,
    type DefaultAccount
} from '@arrhes/application-metadata/components'
import { models } from '@arrhes/application-metadata/models'
import { generateId } from '@arrhes/application-metadata/utilities'
import { randFirstName } from '@ngneat/falso'
import { pbkdf2Sync, randomBytes } from "crypto"
import { dbClient } from '../dbClient.js'


// Helper: Flatten hierarchical accounts into a flat array
function flattenAccounts(accounts: DefaultAccount[]): DefaultAccount[] {
    const result: DefaultAccount[] = []

    function traverse(account: DefaultAccount) {
        result.push(account)
        for (const child of account.children) {
            traverse(child)
        }
    }

    for (const account of accounts) {
        traverse(account)
    }

    return result
}


// Helper: Find parent account number (immediate parent in hierarchy)
function findParentNumber(accountNumber: number, allAccounts: DefaultAccount[]): number | undefined {
    const numberStr = accountNumber.toString()
    if (numberStr.length <= 1) return undefined

    // For each possible parent length (from longest to shortest)
    for (let len = numberStr.length - 1; len >= 1; len--) {
        const potentialParent = parseInt(numberStr.substring(0, len))
        if (allAccounts.some(a => a.number === potentialParent)) {
            return potentialParent
        }
    }

    return undefined
}


async function seed() {
    try {
        // Check if data already exists
        const existingUsers = await dbClient.select().from(models.user).limit(1)
        if (existingUsers.length > 0) {
            console.log("Database already seeded, skipping...")
            return
        }

        await dbClient.transaction(async (tx) => {
            const createdAt = new Date().toISOString()


            // ==========================================
            // USER
            // ==========================================
            console.log("Creating user...")
            const passwordSalt = randomBytes(16).toString('hex')
            const passwordHash = pbkdf2Sync("demo", passwordSalt, 128000, 64, `sha512`).toString(`hex`)
            const newUser: (typeof models.user.$inferInsert) = {
                id: generateId(),
                isActive: true,
                email: "demo@arrhes.com",
                alias: randFirstName(),
                passwordHash: passwordHash,
                passwordSalt: passwordSalt,
                isEmailValidated: true,
                createdAt: createdAt,
            }
            await tx.insert(models.user).values(newUser)


            // ==========================================
            // ORGANIZATION 1: Empty organization
            // ==========================================
            console.log("Creating empty organization...")
            const emptyOrganization: (typeof models.organization.$inferInsert) = {
                id: generateId(),
                isArchived: false,
                scope: "company",
                siren: "111111111",
                name: "Organisation vide",
                email: "empty@arrhes.com",
                createdAt: createdAt,
            }
            await tx.insert(models.organization).values(emptyOrganization)

            // Link user to empty organization
            const emptyOrganizationUser: (typeof models.organizationUser.$inferInsert) = {
                id: generateId(),
                idOrganization: emptyOrganization.id,
                idUser: newUser.id,
                isAdmin: true,
                status: "active",
                createdAt: createdAt,
            }
            await tx.insert(models.organizationUser).values(emptyOrganizationUser)


            // ==========================================
            // ORGANIZATION 2: Fully populated organization
            // ==========================================
            console.log("Creating populated organization...")
            const populatedOrganization: (typeof models.organization.$inferInsert) = {
                id: generateId(),
                isArchived: false,
                scope: "company",
                siren: "222222222",
                name: "Demo company",
                email: "demo@arrhes.com",
                createdAt: createdAt,
            }
            await tx.insert(models.organization).values(populatedOrganization)

            // Link user to populated organization
            const populatedOrganizationUser: (typeof models.organizationUser.$inferInsert) = {
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idUser: newUser.id,
                isAdmin: true,
                status: "active",
                createdAt: createdAt,
            }
            await tx.insert(models.organizationUser).values(populatedOrganizationUser)


            // ==========================================
            // YEAR (for populated organization)
            // ==========================================
            console.log("Creating year...")
            const currentDate = new Date()
            const newYear: (typeof models.year.$inferInsert) = {
                id: generateId(),
                idOrganization: populatedOrganization.id,
                isClosed: false,
                label: `Exercice ${currentDate.getFullYear()}`,
                startingAt: new Date(currentDate.getFullYear(), 0, 1, 0, 0).toISOString(),
                endingAt: new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59).toISOString(),
                createdAt: createdAt,
            }
            await tx.insert(models.year).values(newYear)


            // ==========================================
            // JOURNALS
            // ==========================================
            console.log("Creating journals...")
            const newJournals: (typeof models.journal.$inferInsert)[] = defaultJournals.map((journal) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                code: journal.code,
                label: journal.label,
                createdAt: createdAt,
            }))
            await tx.insert(models.journal).values(newJournals)

            // Create a map for journal lookup
            const journalByCode = new Map(newJournals.map(j => [j.code, j]))


            // ==========================================
            // BALANCE SHEETS
            // ==========================================
            console.log("Creating balance sheets...")
            type BalanceSheetWithMeta = typeof models.balanceSheet.$inferInsert & {
                originalNumber: number
                numberParent: number | undefined
                accounts: typeof defaultCompanyBalanceSheets[number]["accounts"]
            }

            const newBalanceSheets: BalanceSheetWithMeta[] = defaultCompanyBalanceSheets.map((bs) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                idBalanceSheetParent: undefined,
                isDefault: true,
                isComputed: true,
                side: bs.side,
                number: bs.number.toString(),
                label: bs.label,
                createdAt: createdAt,
                originalNumber: bs.number,
                numberParent: bs.numberParent,
                accounts: bs.accounts,
            }))

            // Resolve parent IDs
            for (const bs of newBalanceSheets) {
                if (bs.numberParent !== undefined) {
                    const parent = newBalanceSheets.find(
                        p => p.originalNumber === bs.numberParent && p.side === bs.side
                    )
                    if (parent) {
                        bs.idBalanceSheetParent = parent.id
                    }
                }
            }

            // Insert balance sheets (without meta fields)
            await tx.insert(models.balanceSheet).values(
                newBalanceSheets.map(({ originalNumber, numberParent, accounts, ...bs }) => bs)
            )

            // Create lookup maps for balance sheets
            const balanceSheetByNumberAndSide = new Map(
                newBalanceSheets.map(bs => [`${bs.side}-${bs.originalNumber}`, bs])
            )


            // ==========================================
            // INCOME STATEMENTS
            // ==========================================
            console.log("Creating income statements...")
            type IncomeStatementWithMeta = typeof models.incomeStatement.$inferInsert & {
                originalNumber: number
                numberParent: number | undefined
                accountNumbers: number[]
            }

            const newIncomeStatements: IncomeStatementWithMeta[] = defaultCompanyIncomeStatements.map((is) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                idIncomeStatementParent: undefined,
                isDefault: true,
                isComputed: true,
                number: is.number.toString(),
                label: is.label,
                createdAt: createdAt,
                originalNumber: is.number,
                numberParent: is.numberParent,
                accountNumbers: is.accounts,
            }))

            // Resolve parent IDs
            for (const is of newIncomeStatements) {
                if (is.numberParent !== undefined) {
                    const parent = newIncomeStatements.find(p => p.originalNumber === is.numberParent)
                    if (parent) {
                        is.idIncomeStatementParent = parent.id
                    }
                }
            }

            // Insert income statements (without meta fields)
            await tx.insert(models.incomeStatement).values(
                newIncomeStatements.map(({ originalNumber, numberParent, accountNumbers, ...is }) => is)
            )

            // Create lookup map for income statements
            const incomeStatementByNumber = new Map(
                newIncomeStatements.map(is => [is.originalNumber, is])
            )


            // ==========================================
            // ACCOUNTS
            // ==========================================
            console.log("Creating accounts...")
            const flatAccounts = flattenAccounts(defaultCompanyAccounts)

            type AccountWithMeta = typeof models.account.$inferInsert & {
                originalNumber: number
            }

            // Create account map for balance sheet lookups (account number -> balance sheet info)
            const accountToBalanceSheetAsset = new Map<number, {
                id: string
                flow: "debit" | "credit"
                isAmortization: boolean
            }>()
            const accountToBalanceSheetLiability = new Map<number, {
                id: string
                flow: "debit" | "credit"
                isAmortization: boolean
            }>()

            for (const bs of newBalanceSheets) {
                for (const acc of bs.accounts) {
                    const mapping = {
                        id: bs.id!,
                        flow: acc.flow,
                        isAmortization: acc.isAmortization
                    }
                    if (bs.side === "asset") {
                        accountToBalanceSheetAsset.set(acc.number, mapping)
                    } else {
                        accountToBalanceSheetLiability.set(acc.number, mapping)
                    }
                }
            }

            // Create account map for income statement lookups
            const accountToIncomeStatement = new Map<number, string>()
            for (const is of newIncomeStatements) {
                for (const accNum of is.accountNumbers) {
                    accountToIncomeStatement.set(accNum, is.id!)
                }
            }

            // Build account objects
            const newAccounts: AccountWithMeta[] = flatAccounts.map((account) => {
                const assetMapping = accountToBalanceSheetAsset.get(account.number)
                const liabilityMapping = accountToBalanceSheetLiability.get(account.number)
                const incomeStatementId = accountToIncomeStatement.get(account.number)

                return {
                    id: generateId(),
                    idOrganization: populatedOrganization.id,
                    idYear: newYear.id,
                    idAccountParent: undefined,
                    idBalanceSheetAsset: assetMapping?.id ?? null,
                    balanceSheetAssetColumn: assetMapping
                        ? (assetMapping.isAmortization ? "amortization" : "gross")
                        : null,
                    balanceSheetAssetFlow: assetMapping?.flow ?? null,
                    idBalanceSheetLiability: liabilityMapping?.id ?? null,
                    balanceSheetLiabilityColumn: liabilityMapping
                        ? (liabilityMapping.isAmortization ? "amortization" : "gross")
                        : null,
                    balanceSheetLiabilityFlow: liabilityMapping?.flow ?? null,
                    idIncomeStatement: incomeStatementId ?? null,
                    isMandatory: account.isMandatory,
                    isClass: account.isClass,
                    isSelectable: account.isSelectable,
                    isDefault: true,
                    number: account.number.toString(),
                    label: account.label,
                    type: account.type,
                    createdAt: createdAt,
                    originalNumber: account.number,
                }
            })

            // Resolve parent account IDs
            const accountByNumber = new Map(newAccounts.map(a => [a.originalNumber, a]))
            for (const account of newAccounts) {
                const parentNumber = findParentNumber(account.originalNumber, flatAccounts)
                if (parentNumber !== undefined) {
                    const parent = accountByNumber.get(parentNumber)
                    if (parent) {
                        account.idAccountParent = parent.id
                    }
                }
            }

            // Insert accounts (without meta fields)
            await tx.insert(models.account).values(
                newAccounts.map(({ originalNumber, ...acc }) => acc)
            )


            // ==========================================
            // COMPUTATIONS
            // ==========================================
            console.log("Creating computations...")
            type ComputationWithMeta = typeof models.computation.$inferInsert & {
                incomeStatements: typeof defaultComputations[number]["incomeStatements"]
            }

            const newComputations: ComputationWithMeta[] = defaultComputations.map((comp, index) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                index: index,
                number: comp.number.toString(),
                label: comp.label,
                createdAt: createdAt,
                incomeStatements: comp.incomeStatements,
            }))

            // Insert computations (without meta fields)
            await tx.insert(models.computation).values(
                newComputations.map(({ incomeStatements, ...comp }) => comp)
            )


            // ==========================================
            // COMPUTATION INCOME STATEMENTS
            // ==========================================
            console.log("Creating computation income statements...")
            const newComputationIncomeStatements: (typeof models.computationIncomeStatement.$inferInsert)[] = []

            for (const computation of newComputations) {
                for (let i = 0; i < computation.incomeStatements.length; i++) {
                    const isRef = computation.incomeStatements[i]
                    const incomeStatement = incomeStatementByNumber.get(isRef.number)

                    if (!incomeStatement) {
                        console.warn(`Income statement not found: ${isRef.number} for computation ${computation.number}`)
                        continue
                    }

                    newComputationIncomeStatements.push({
                        id: generateId(),
                        idOrganization: populatedOrganization.id,
                        idYear: newYear.id,
                        idComputation: computation.id!,
                        idIncomeStatement: incomeStatement.id!,
                        index: i,
                        operation: isRef.operation,
                        createdAt: createdAt,
                    })
                }
            }

            if (newComputationIncomeStatements.length > 0) {
                await tx.insert(models.computationIncomeStatement).values(newComputationIncomeStatements)
            }


            // ==========================================
            // RECORD LABELS
            // ==========================================
            console.log("Creating record labels...")
            const recordLabelData = [
                { label: "Loyer mensuel" },
                { label: "Facture fournisseur" },
                { label: "Vente client" },
                { label: "Salaires" },
                { label: "Charges sociales" },
                { label: "Electricite" },
                { label: "Abonnement internet" },
            ]

            const newRecordLabels: (typeof models.recordLabel.$inferInsert)[] = recordLabelData.map((rl) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                label: rl.label,
                createdAt: createdAt,
            }))

            await tx.insert(models.recordLabel).values(newRecordLabels)


            // ==========================================
            // SAMPLE RECORDS AND RECORD ROWS
            // ==========================================
            console.log("Creating sample records and record rows...")

            // Get some accounts for sample entries
            const account512 = newAccounts.find(a => a.originalNumber === 512) // Banque
            const account401 = newAccounts.find(a => a.originalNumber === 401) // Fournisseurs (we need to check if it exists)
            const account411 = newAccounts.find(a => a.originalNumber === 411) // Clients
            const account706 = newAccounts.find(a => a.originalNumber === 706) // Prestations de services
            const account607 = newAccounts.find(a => a.originalNumber === 607) // Achats de marchandises
            const account44566 = newAccounts.find(a => a.originalNumber === 44566) // TVA deductible
            const account44571 = newAccounts.find(a => a.originalNumber === 44571) // TVA collectee

            const journalVT = journalByCode.get("VT")
            const journalAC = journalByCode.get("AC")
            const journalBQ = journalByCode.get("BQ")

            const sampleRecords: {
                record: typeof models.record.$inferInsert
                rows: typeof models.recordRow.$inferInsert[]
            }[] = []

            // Sample sale record
            if (journalVT && account411 && account706 && account44571) {
                const recordId = generateId()
                sampleRecords.push({
                    record: {
                        id: recordId,
                        idOrganization: populatedOrganization.id,
                        idYear: newYear.id,
                        idJournal: journalVT.id,
                        idAttachment: null,
                        idRecordLabel: newRecordLabels[2].id, // Vente client
                        label: "Facture client FC001",
                        date: new Date(currentDate.getFullYear(), 0, 15).toISOString(),
                        createdAt: createdAt,
                    },
                    rows: [
                        {
                            id: generateId(),
                            idOrganization: populatedOrganization.id,
                            idYear: newYear.id,
                            idRecord: recordId,
                            idAccount: account411.id,
                            isComputedForJournalReport: false,
                            isComputedForLedgerReport: false,
                            isComputedForBalanceReport: false,
                            isComputedForBalanceSheetReport: false,
                            isComputedForIncomeStatementReport: false,
                            label: "Client - Facture FC001",
                            debit: "1200.00",
                            credit: "0.00",
                            createdAt: createdAt,
                        },
                        {
                            id: generateId(),
                            idOrganization: populatedOrganization.id,
                            idYear: newYear.id,
                            idRecord: recordId,
                            idAccount: account706.id,
                            isComputedForJournalReport: false,
                            isComputedForLedgerReport: false,
                            isComputedForBalanceReport: false,
                            isComputedForBalanceSheetReport: false,
                            isComputedForIncomeStatementReport: false,
                            label: "Prestation de services",
                            debit: "0.00",
                            credit: "1000.00",
                            createdAt: createdAt,
                        },
                        {
                            id: generateId(),
                            idOrganization: populatedOrganization.id,
                            idYear: newYear.id,
                            idRecord: recordId,
                            idAccount: account44571.id,
                            isComputedForJournalReport: false,
                            isComputedForLedgerReport: false,
                            isComputedForBalanceReport: false,
                            isComputedForBalanceSheetReport: false,
                            isComputedForIncomeStatementReport: false,
                            label: "TVA collectee",
                            debit: "0.00",
                            credit: "200.00",
                            createdAt: createdAt,
                        },
                    ],
                })
            }

            // Sample bank receipt record
            if (journalBQ && account512 && account411) {
                const recordId = generateId()
                sampleRecords.push({
                    record: {
                        id: recordId,
                        idOrganization: populatedOrganization.id,
                        idYear: newYear.id,
                        idJournal: journalBQ.id,
                        idAttachment: null,
                        idRecordLabel: null,
                        label: "Encaissement client",
                        date: new Date(currentDate.getFullYear(), 1, 1).toISOString(),
                        createdAt: createdAt,
                    },
                    rows: [
                        {
                            id: generateId(),
                            idOrganization: populatedOrganization.id,
                            idYear: newYear.id,
                            idRecord: recordId,
                            idAccount: account512.id,
                            isComputedForJournalReport: false,
                            isComputedForLedgerReport: false,
                            isComputedForBalanceReport: false,
                            isComputedForBalanceSheetReport: false,
                            isComputedForIncomeStatementReport: false,
                            label: "Encaissement FC001",
                            debit: "1200.00",
                            credit: "0.00",
                            createdAt: createdAt,
                        },
                        {
                            id: generateId(),
                            idOrganization: populatedOrganization.id,
                            idYear: newYear.id,
                            idRecord: recordId,
                            idAccount: account411.id,
                            isComputedForJournalReport: false,
                            isComputedForLedgerReport: false,
                            isComputedForBalanceReport: false,
                            isComputedForBalanceSheetReport: false,
                            isComputedForIncomeStatementReport: false,
                            label: "Reglement client",
                            debit: "0.00",
                            credit: "1200.00",
                            createdAt: createdAt,
                        },
                    ],
                })
            }

            // Insert records
            if (sampleRecords.length > 0) {
                await tx.insert(models.record).values(sampleRecords.map(r => r.record))
                await tx.insert(models.recordRow).values(sampleRecords.flatMap(r => r.rows))
            }


            console.log("Seed completed successfully!")
            console.log(`- 1 user created`)
            console.log(`- 2 organizations created (1 empty, 1 populated)`)
            console.log(`- 1 year created`)
            console.log(`- ${newJournals.length} journals created`)
            console.log(`- ${newBalanceSheets.length} balance sheets created`)
            console.log(`- ${newIncomeStatements.length} income statements created`)
            console.log(`- ${newAccounts.length} accounts created`)
            console.log(`- ${newComputations.length} computations created`)
            console.log(`- ${newComputationIncomeStatements.length} computation-income statement links created`)
            console.log(`- ${newRecordLabels.length} record labels created`)
            console.log(`- ${sampleRecords.length} sample records created`)
        })

    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()

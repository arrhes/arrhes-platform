import { DefaultBalanceSheet, defaultCompanyBalanceSheets, defaultCompanyIncomeStatements, DefaultComputation, defaultComputations, defaultJournals } from '@arrhes/schemas/components'
import { models } from '@arrhes/schemas/models'
import { generateId } from '@arrhes/schemas/utilities'
import { randFirstName } from '@ngneat/falso'
import { pbkdf2Sync, randomBytes } from "crypto"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from '../env.js'


const connection = postgres(env()?.DATABASE_URL ?? "", { max: 1 })
const db = drizzle(connection)


async function seed() {
    try {
        await db.transaction(async (tx) => {


            // User
            console.log("Add user")
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
                createdAt: new Date().toISOString(),
            }
            await tx.insert(models.user).values(newUser)


            // Organization
            console.log("Add organization")
            const newOrganization: (typeof models.organization.$inferInsert) = {
                id: generateId(),
                isArchived: false,
                scope: "company",
                siren: "123456789",
                name: "Arrhes",
                email: "demo@arrhes.com",
                createdAt: new Date().toISOString(),
            }
            await tx.insert(models.organization).values(newOrganization)


            // OrganizationUser
            console.log("Add user")
            const newOrganizationUser: (typeof models.organizationUser.$inferInsert) = {
                id: generateId(),
                idOrganization: newOrganization.id,
                idUser: newUser.id,
                isAdmin: true,
                status: "active",
                createdAt: new Date().toISOString(),
            }
            await tx.insert(models.organizationUser).values(newOrganizationUser)


            // Years
            console.log("Add years")
            const newYear: (typeof models.year.$inferInsert) = {
                id: generateId(),
                idOrganization: newOrganization.id,
                isClosed: false,
                label: "Exercice 2024",
                startingAt: new Date(2024, 0, 1, 0, 0).toISOString(),
                endingAt: new Date(2024, 11, 31, 23, 59, 99).toISOString(),
                createdAt: new Date().toISOString(),
            }
            await tx.insert(models.year).values(newYear)


            // Journals
            console.log("Add journals")
            const newJournals: (typeof models.journal.$inferInsert)[] = defaultJournals.map((journal) => ({
                id: generateId(),
                idOrganization: newOrganization.id,
                idYear: newYear.id,
                code: journal.code,
                label: journal.label,
                createdAt: new Date().toISOString(),
            }))
            await tx.insert(models.journal).values(newJournals)


            // Accounts
            // console.log("Add accounts")
            // let newAccounts: (typeof models.account.$inferInsert)[] = defaultCompanyAccounts.map((_account) => ({
            //     id: generateId(),
            //     idOrganization: newOrganization.id,
            //     idYear: newYear.id,
            //     idParent: undefined,
            //     isDefault: true,
            //     number: _account.number.toString(),
            //     isMandatory: _account.isMandatory,
            //     isClass: _account.isClass,
            //     isSelectable: _account.isSelectable,
            //     label: _account.label,
            //     type: _account.type,
            //     scope: "company",
            //     createdAt: new Date().toISOString(),
            // }))
            // newAccounts = newAccounts.map((_account) => {
            //     const parent = newAccounts.find((x) => x.number !== _account.number && _account.number.toString().includes(x.number.toString()) && _account.number.toString().length === x.number.toString().length + 1)

            //     return ({
            //         ..._account,
            //         idParent: parent?.id
            //     })
            // })
            // await tx.insert(models.account).values(newAccounts)


            // Sheets
            console.log("Add sheets")
            let newBalanceSheets: (typeof models.balanceSheet.$inferInsert & { numberParent: number | undefined, accounts: DefaultBalanceSheet["accounts"][number][] })[] = defaultCompanyBalanceSheets.map((_balanceSheet) => ({
                id: generateId(),
                idOrganization: newOrganization.id,
                idYear: newYear.id,
                isDefault: true,
                side: _balanceSheet.side,
                number: _balanceSheet.number.toString(),
                label: _balanceSheet.label,
                grossAmountAdded: "0",
                amortizationAmountAdded: "0",
                netAmountAdded: "0",
                createdAt: new Date().toISOString(),
                numberParent: _balanceSheet.numberParent,
                accounts: _balanceSheet.accounts,
            }))
            // newSheets = newSheets.map((_sheet) => {
            //     const parent = newSheets.find((x) => (x.number === _sheet.numberParent) && (x.side === _sheet.side))

            //     return ({
            //         ..._sheet,
            //         idParent: parent?.id
            //     })
            // })
            await tx.insert(models.balanceSheet).values(newBalanceSheets)


            // Statements
            console.log("Add statements")
            let newIncomeStatements: Array<
                & typeof models.incomeStatement.$inferInsert
                & {
                    numberParent: number | undefined,
                    accounts: number[]
                }
            > = defaultCompanyIncomeStatements
                .map((_incomeStatement) => ({
                    id: generateId(),
                    idOrganization: newOrganization.id,
                    idYear: newYear.id,
                    isDefault: true,
                    number: _incomeStatement.number.toString(),
                    label: _incomeStatement.label,
                    netAmountAdded: "0",
                    createdAt: new Date().toISOString(),
                    numberParent: _incomeStatement.numberParent,
                    accounts: _incomeStatement.accounts
                }))
            // newStatements = newStatements.map((_statement) => {
            //     const parent = newStatements.find((x) => x.number === _statement.numberParent)

            //     return ({
            //         ..._statement,
            //         idParent: parent?.id
            //     })
            // })
            await tx.insert(models.incomeStatement).values(newIncomeStatements)



            // Computations
            console.log("Add computations")
            const newComputations: Array<
                & typeof models.computation.$inferInsert
                & { incomeStatements: DefaultComputation["incomeStatements"][number][] }
            > = defaultComputations.map((_computation) => {
                return ({
                    id: generateId(),
                    idOrganization: newOrganization.id,
                    idYear: newYear.id,
                    number: _computation.number.toString(),
                    label: _computation.label,
                    createdAt: new Date().toISOString(),
                    incomeStatements: _computation.incomeStatements
                })
            })
            await tx.insert(models.computation).values(newComputations)


            // ComputationStatements
            console.log("Add computationStatements")
            const newComputationIncomeStatements: Array<(typeof models.computationIncomeStatement.$inferInsert)> = []
            newComputations.forEach((_computation) => {
                _computation.incomeStatements.forEach((_incomeStatement) => {
                    const incomeStatement = newIncomeStatements.find((x) => x.number === _incomeStatement.number.toString())

                    if (!incomeStatement) return console.log(`Statement not found ${_computation.number} ${_incomeStatement.number}`)
                    newComputationIncomeStatements.push({
                        id: generateId(),
                        idOrganization: newOrganization.id,
                        idYear: newYear.id,
                        idComputation: _computation.id,
                        idIncomeStatement: incomeStatement.id,
                        operation: _incomeStatement.operation,
                        createdAt: new Date().toISOString(),
                    })
                })
            })
            await tx.insert(models.computationIncomeStatement).values(newComputationIncomeStatements)


            // Check accounts
            // newAccounts.forEach((account) => {
            //     if (account.isClass) return
            //     if (!account.isSelectable) return
            //     // if (newAccounts.find(x => x.idParent === account.id)) return

            //     const accountClass = account.number.toString().at(0) ?? ""

            //     if (["1", "2", "3", "4", "5"].includes(accountClass)) {
            //         if (account.idBalanceSheet === null) {
            //             console.log(`Account not used (sheet) ${account.number} ${account.isMandatory}`)
            //         }
            //     }

            //     if (["6", "7"].includes(accountClass)) {
            //         if (account.idIncomeStatement === null) {
            //             console.log(`Account not used (statement) ${account.number} ${account.isMandatory}`)
            //         }
            //     }
            // })

            // Record and recordRows
            // console.log("Add record and recordRows")
            // const newRecords: (typeof models.record.$inferInsert)[] = []
            // const newRows: (typeof models.recordRow.$inferInsert)[] = []
            // defaultRecords2022.forEach((record) => {

            //     const idRecord = generateId()
            //     newRecords.push({
            //         id: idRecord,
            //         idOrganization: newOrganization.id,
            //         idYear: newYear.id,
            //         idJournal: undefined,
            //         idAttachment: undefined,
            //         label: record.label,
            //         date: record.date,
            //         createdAt: new Date().toISOString(),
            //     })

            //     record.rows.forEach((row) => {
            //         const idAccount = newAccounts.find((account) => account.number === row.accountNumber.toString())?.id
            //         if (!idAccount) {
            //             console.log("Erreur row", row)
            //             return
            //         }
            //         newRows.push({
            //             id: generateId(),
            //             idOrganization: newOrganization.id,
            //             idYear: newYear.id,
            //             idAccount: idAccount,
            //             idRecord: idRecord,
            //             computedCode: null,
            //             isComputed: true,
            //             label: row.label,
            //             debit: row.debit.toString(),
            //             credit: row.credit.toString(),
            //             createdAt: new Date().toISOString(),
            //         })
            //     })

            // })
            // if (newRecords.length > 0 && newRows.length > 0) {
            //     await tx.insert(models.record).values(newRecords)
            //     await tx.insert(models.recordRow).values(newRows)
            // }
        })

    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()

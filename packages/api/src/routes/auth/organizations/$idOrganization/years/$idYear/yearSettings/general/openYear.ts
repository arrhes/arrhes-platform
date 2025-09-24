import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { openYearRouteDefinition } from "@arrhes/schemas/routes"


export const openYearRoute = authFactory.createApp()
    .post(
        openYearRouteDefinition.path,
        bodyValidator(openYearRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            // const idPreviousYear = c.var.currentYear.idPreviousYear
            // if (!idPreviousYear) throw new HTTPException(400, { message: "Aucun exercice précédent n'est déclaré" })

            // await db.transaction(async (tx) => {

            //     // We delete, if existing, the previous opening record
            //     await tx
            //         .delete(records)
            //         .where(and(
            //             eq(records.idOrganization, c.var.user.idOrganization),
            //             eq(records.idYear, c.var.currentYear.id),
            //             eq(records.idAutomatic, "OPEN_SHEET")
            //         ))

            //     // We create the new opening record
            //     const [createRecord] = await tx
            //         .insert(records)
            //         .values({
            //             id: generateId(),
            //             idOrganization: c.var.organization.id,
            //             idYear: c.var.currentYear.id,
            //             idJournal: body.idJournalOpening,
            //             idAutomatic: "OPEN_SHEET",
            //             isValidated: true,
            //             isComputed: true,
            //             label: "Report du bilan de l'exercice précédent",
            //             date: c.var.currentYear.startingOn,
            //             lastUpdatedBy: c.var.user.id,
            //             createdBy: c.var.user.id
            //         })
            //         .returning()

            //     // We read the current accounts
            //     const readRecord = await tx.query.records.findFirst({
            //         where: and(
            //             eq(records.idOrganization, c.var.user.idOrganization),
            //             eq(records.idYear, idPreviousYear),
            //             eq(records.idAutomatic, "SETTLE_SHEET")
            //         ),
            //         with: {
            //             rows: {
            //                 with: {
            //                     account: true
            //                 }
            //             },
            //         }
            //     })
            //     if (!readRecord) throw new HTTPException(400, { message: "Le solde du bilan de l'exercice précédent n'a pas été trouvé" })

            //     const readAccounts = await tx.query.accounts.findMany({
            //         where: and(
            //             eq(records.idOrganization, c.var.user.idOrganization),
            //             eq(records.idYear, c.var.currentYear.id)
            //         )
            //     })

            //     // We create the new rows
            //     const sheetRows: Array<(typeof rows.$inferInsert)> = []
            //     readRecord.rows.forEach((row) => {
            //         const account = readAccounts.find((_account) => _account.number === row.account.number)
            //         if (!account) throw new HTTPException(400, { message: "Les comptes liés n'ont pas été rapprochés" })
            //         sheetRows.push({
            //             id: generateId(),
            //             idOrganization: c.var.organization.id,
            //             idYear: c.var.currentYear.id,
            //             idRecord: createRecord.id,
            //             idAccount: account.id,
            //             debit: row.credit.toString(),
            //             credit: row.debit.toString(),
            //             label: "Report du compte",
            //             lastUpdatedBy: c.var.user.id,
            //             createdBy: c.var.user.id
            //         })
            //     })
            //     await tx
            //         .insert(rows)
            //         .values(sheetRows)

            // })

            return response({
                context: c,
                statusCode: 200,
                schema: openYearRouteDefinition.schemas.return,
                data: {},
            })
        }
    )

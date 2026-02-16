import { models } from "@arrhes/application-metadata/models"
import { duplicateOneRecordRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertMany } from "../../../../../../../../utilities/sql/insertMany.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const duplicateOneRecordRoute = authFactory
    .createApp()
    .post(
        duplicateOneRecordRouteDefinition.path,
        bodyValidator(duplicateOneRecordRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const duplicatedRecord = await c.var.clients.sql.transaction(async (tx) => {
                const originalRecord = await selectOne({
                    database: tx,
                    table: models.record,
                    where: (table) =>
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                            eq(table.id, body.idRecord),
                        ),
                })

                const originalRecordRows = await selectMany({
                    database: tx,
                    table: models.recordRow,
                    where: (table) =>
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                            eq(table.idRecord, originalRecord.id),
                        ),
                })

                const duplicateRecord = await insertOne({
                    database: tx,
                    table: models.record,
                    data: {
                        id: generateId(),
                        idOrganization: originalRecord.idOrganization,
                        idYear: originalRecord.idYear,
                        idJournal: originalRecord.idJournal,
                        idRecordLabel: originalRecord.idRecordLabel,
                        idAttachment: originalRecord.idAttachment,
                        label: `${originalRecord.label} (copy)`,
                        date: originalRecord.date,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: c.var.user.id,
                        lastUpdatedBy: null,
                    },
                })

                const duplicateRecordRows = await insertMany({
                    database: tx,
                    table: models.recordRow,
                    data: originalRecordRows.map((recordRow) => ({
                        id: generateId(),
                        idOrganization: originalRecord.idOrganization,
                        idYear: originalRecord.idYear,
                        idRecord: duplicateRecord.id,
                        idAccount: recordRow.idAccount,
                        flag: recordRow.flag,
                        isComputedForJournalReport: recordRow.isComputedForJournalReport,
                        isComputedForLedgerReport: recordRow.isComputedForLedgerReport,
                        isComputedForBalanceReport: recordRow.isComputedForBalanceReport,
                        isComputedForBalanceSheetReport: recordRow.isComputedForBalanceSheetReport,
                        isComputedForIncomeStatementReport: recordRow.isComputedForIncomeStatementReport,
                        label: recordRow.label,
                        debit: recordRow.debit,
                        credit: recordRow.credit,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: c.var.user.id,
                        lastUpdatedBy: null,
                    })),
                })

                return duplicateRecord
            })

            return response({
                context: c,
                statusCode: 200,
                schema: duplicateOneRecordRouteDefinition.schemas.return,
                data: duplicatedRecord,
            })
        },
    )

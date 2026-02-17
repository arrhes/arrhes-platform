import { models } from "@arrhes/application-metadata/models"
import { updateManyRecordRowsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const updateManyRecordRowsRoute = authFactory
    .createApp()
    .post(
        updateManyRecordRowsRouteDefinition.path,
        bodyValidator(updateManyRecordRowsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllRecordRows = await selectMany({
                database: c.var.clients.sql,
                table: models.recordRow,
                where: (table) =>
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idRecord, body.idRecord),
                    ),
            })

            const updatedRecordRows = await c.var.clients.sql.transaction(async (_tx) => {
                const recordRows = []
                for (const recordRow of readAllRecordRows) {
                    const updatedRecordRow = await updateOne({
                        database: c.var.clients.sql,
                        table: models.recordRow,
                        data: {
                            isComputedForJournalReport: body.isComputedForJournalReport,
                            isComputedForLedgerReport: body.isComputedForLedgerReport,
                            isComputedForBalanceReport: body.isComputedForBalanceReport,
                            isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport,
                            isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport,
                            label: body.label,
                            lastUpdatedAt: new Date().toISOString(),
                            lastUpdatedBy: c.var.user.id,
                        },
                        where: (table) =>
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.id, recordRow.id),
                            ),
                    })
                    recordRows.push(updatedRecordRow)
                }

                return recordRows
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateManyRecordRowsRouteDefinition.schemas.return,
                data: updatedRecordRows,
            })
        },
    )

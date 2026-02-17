import { models } from "@arrhes/application-metadata/models"
import { updateOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneRecordRowRoute = authFactory
    .createApp()
    .post(updateOneRecordRowRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneRecordRowRouteDefinition.schemas.body,
        })

        const updatedRecordRow = await updateOne({
            database: c.var.clients.sql,
            table: models.recordRow,
            data: {
                idRecord: body.idRecord,
                idAccount: body.idAccount,
                isComputedForJournalReport: body.isComputedForJournalReport,
                isComputedForLedgerReport: body.isComputedForLedgerReport,
                isComputedForBalanceReport: body.isComputedForBalanceReport,
                isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport,
                isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport,
                label: body.label,
                debit: body.debit,
                credit: body.credit,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecordRow),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneRecordRowRouteDefinition.schemas.return,
            data: updatedRecordRow,
        })
    })

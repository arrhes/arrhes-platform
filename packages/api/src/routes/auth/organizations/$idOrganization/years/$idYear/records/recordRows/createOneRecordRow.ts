import { models } from "@arrhes/application-metadata/models"
import { createOneRecordRowRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"

export const createOneRecordRowRoute = authFactory
    .createApp()
    .post(createOneRecordRowRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneRecordRowRouteDefinition.schemas.body,
        })

        const readOneRecord = await selectOne({
            database: c.var.clients.sql,
            table: models.record,
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecord),
                ),
        })

        const createOneRecordRow = await insertOne({
            database: c.var.clients.sql,
            table: models.recordRow,
            data: {
                id: generateId(),
                idOrganization: body.idOrganization,
                idYear: body.idYear,
                idRecord: body.idRecord,
                idAccount: body.idAccount,
                isComputedForJournalReport: body.isComputedForJournalReport,
                isComputedForLedgerReport: body.isComputedForLedgerReport,
                isComputedForBalanceReport: body.isComputedForBalanceReport,
                isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport,
                isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport,
                label: body.label ?? readOneRecord.label,
                debit: body.debit ?? "0.00",
                credit: body.credit ?? "0.00",
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: c.var.user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneRecordRowRouteDefinition.schemas.return,
            data: createOneRecordRow,
        })
    })

import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { updateOne } from "#src/utilities/sql/updateOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { updateOneIncomeStatementRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const updateOneIncomeStatementRoute = authFactory.createApp()
    .post(
        updateOneIncomeStatementRouteDefinition.path,
        bodyValidator(updateOneIncomeStatementRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const updatedIncomeStatement = await updateOne({
                database: c.var.clients.sql,
                table: models.incomeStatement,
                data: {
                    idIncomeStatementParent: body.idIncomeStatementParent,
                    number: body.number,
                    label: body.label,
                    netAmountAdded: body.netAmountAdded,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idIncomeStatement),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneIncomeStatementRouteDefinition.schemas.return,
                data: updatedIncomeStatement,
            })
        }
    )

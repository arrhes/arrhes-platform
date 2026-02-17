import { models } from "@arrhes/application-metadata/models"
import { updateOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneBalanceSheetRoute = authFactory
    .createApp()
    .post(updateOneBalanceSheetRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneBalanceSheetRouteDefinition.schemas.body,
        })

        const updatedBalanceSheet = await updateOne({
            database: c.var.clients.sql,
            table: models.balanceSheet,
            data: {
                idBalanceSheetParent: body.idBalanceSheetParent,
                isComputed: body.isComputed,
                number: body.number,
                label: body.label,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: c.var.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, body.idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idBalanceSheet),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneBalanceSheetRouteDefinition.schemas.return,
            data: updatedBalanceSheet,
        })
    })

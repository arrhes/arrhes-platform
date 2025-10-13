import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { updateOne } from "#/utilities/sql/updateOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { updateOneAccountRouteDefinition } from "@arrhes/metadata/routes"
import { and, eq } from "drizzle-orm"


export const updateOneAccountRoute = authFactory.createApp()
    .post(
        updateOneAccountRouteDefinition.path,
        bodyValidator(updateOneAccountRouteDefinition.schemas.body),
        async (c) => {

            const body = c.req.valid("json")

            const updateOneAccount = await updateOne({
                database: c.var.clients.sql,
                table: models.account,
                data: {
                    idAccountParent: body.idAccountParent,

                    idBalanceSheetAsset: body.idBalanceSheetAsset,
                    balanceSheetAssetColumn: body.balanceSheetAssetColumn,
                    idBalanceSheetLiability: body.idBalanceSheetLiability,
                    balanceSheetLiabilityColumn: body.balanceSheetLiabilityColumn,

                    idIncomeStatement: body.idIncomeStatement,

                    isClass: body.isClass,
                    isSelectable: body.isSelectable,
                    number: body.number,
                    label: body.label,
                    type: body.type,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: c.var.user.id,
                },
                where: (table) => (
                    and(
                        eq(table.idOrganization, body.idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idAccount),
                    )
                )
            })

            return response({
                context: c,
                statusCode: 200,
                schema: updateOneAccountRouteDefinition.schemas.return,
                data: updateOneAccount,
            })
        }
    )
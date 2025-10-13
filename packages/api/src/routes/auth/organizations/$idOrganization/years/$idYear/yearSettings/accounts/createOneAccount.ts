import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { insertOne } from "#/utilities/sql/insertOne.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { createOneAccountRouteDefinition } from "@arrhes/metadata/routes"
import { generateId } from "@arrhes/metadata/utilities"
import { and, eq } from "drizzle-orm"


export const createOneAccountRoute = authFactory.createApp()
    .post(
        createOneAccountRouteDefinition.path,
        bodyValidator(createOneAccountRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readOneAccount = await selectOne({
                database: c.var.clients.sql,
                table: models.account,
                where: (table) => {
                    if (body.idAccountParent === null) {
                        return
                    }
                    return (
                        and(
                            eq(table.idOrganization, body.idOrganization),
                            eq(table.idYear, body.idYear),
                            eq(table.id, body.idAccountParent),
                        )
                    )
                }
            })

            const createOneAccount = await insertOne({
                database: c.var.clients.sql,
                table: models.account,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    idAccountParent: body.idAccountParent,

                    idBalanceSheetAsset: body.idBalanceSheetAsset ?? readOneAccount?.idBalanceSheetAsset,
                    balanceSheetAssetColumn: body.balanceSheetAssetColumn ?? readOneAccount?.balanceSheetAssetColumn,
                    idBalanceSheetLiability: body.idBalanceSheetLiability ?? readOneAccount?.idBalanceSheetLiability,
                    balanceSheetLiabilityColumn: body.balanceSheetLiabilityColumn ?? readOneAccount?.balanceSheetLiabilityColumn,

                    idIncomeStatement: body.idIncomeStatement,

                    isClass: body.isClass,
                    isSelectable: body.isSelectable,
                    isDefault: false,
                    label: body.label,
                    number: body.number,
                    type: body.type,
                    isMandatory: true,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createOneAccountRouteDefinition.schemas.return,
                data: createOneAccount,
            })
        }
    )
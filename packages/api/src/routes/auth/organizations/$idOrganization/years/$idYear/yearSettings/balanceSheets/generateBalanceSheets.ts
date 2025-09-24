import { authFactory } from "#/factories/authFactory.js"
import { Exception } from "#/utilities/exception.js"
import { response } from "#/utilities/response.js"
import { deleteMany } from "#/utilities/sql/deleteMany.js"
import { insertMany } from "#/utilities/sql/insertMany.js"
import { selectOne } from "#/utilities/sql/selectOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { defaultAssociationBalanceSheets, defaultCompanyBalanceSheets } from "@arrhes/metadata/components"
import { models } from "@arrhes/metadata/models"
import { generateBalanceSheetsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import { generateId } from "@arrhes/metadata/utilities"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"


export const generateBalanceSheetsRoute = authFactory.createApp()
    .post(
        generateBalanceSheetsRouteDefinition.path,
        bodyValidator(generateBalanceSheetsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const generatedBalanceSheets = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedBalanceSheets = await deleteMany({
                        database: tx,
                        table: models.balanceSheet,
                        where: (table) => (
                            and(
                                eq(table.idOrganization, body.idOrganization),
                                eq(table.idYear, body.idYear)
                            )
                        )
                    })
                }
                catch (error: unknown) {
                    throw new Exception({
                        internalMessage: "Failed to delete balanceSheets",
                        externalMessage: "Échec de la suppression des lignes de bilan",
                    })
                }

                const organization = await selectOne({
                    database: tx,
                    table: models.organization,
                    where: (table) => (
                        eq(table.id, body.idOrganization)
                    )
                })
                const defaultBalanceSheets = (
                    (organization.scope === "association")
                        ? defaultAssociationBalanceSheets
                        : defaultCompanyBalanceSheets
                )


                const newBalanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>> = []

                defaultBalanceSheets
                    .forEach((defaultBalanceSheet) => {
                        const balanceSheetParent = newBalanceSheets.find((newBalanceSheet) => {
                            return newBalanceSheet.number === defaultBalanceSheet.numberParent?.toString()
                        })
                        newBalanceSheets.push({
                            id: generateId(),
                            idOrganization: body.idOrganization,
                            idYear: body.idYear,
                            idBalanceSheetParent: balanceSheetParent?.id ?? null,
                            number: defaultBalanceSheet.number.toString(),
                            isDefault: true,
                            label: defaultBalanceSheet.label,
                            side: defaultBalanceSheet.side,
                            grossAmountAdded: "0.00",
                            amortizationAmountAdded: "0.00",
                            netAmountAdded: "0.00",
                            createdAt: new Date().toISOString(),
                            lastUpdatedAt: null,
                            createdBy: null,
                            lastUpdatedBy: null,
                        })
                    })


                const generatedBalanceSheets = await insertMany({
                    database: tx,
                    table: models.balanceSheet,
                    data: newBalanceSheets,
                })

                return generatedBalanceSheets
            })


            return response({
                context: c,
                statusCode: 200,
                schema: generateBalanceSheetsRouteDefinition.schemas.return,
                data: generatedBalanceSheets,
            })
        }
    )
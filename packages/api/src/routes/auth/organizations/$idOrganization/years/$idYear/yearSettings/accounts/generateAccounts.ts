import { authFactory } from "#src/factories/authFactory.js"
import { Exception } from "#src/utilities/exception.js"
import { response } from "#src/utilities/response.js"
import { deleteMany } from "#src/utilities/sql/deleteMany.js"
import { insertMany } from "#src/utilities/sql/insertMany.js"
import { selectOne } from "#src/utilities/sql/selectOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { DefaultAccount, defaultAssociationAccounts, defaultCompanyAccounts } from "@arrhes/schemas/components"
import { models } from "@arrhes/schemas/models"
import { generateAccountsRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { generateId } from "@arrhes/schemas/utilities"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"


function generateAccounts(parameters: {
    accounts: Array<DefaultAccount>
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    idAccountParent: v.InferOutput<typeof returnedSchemas.account>["idAccountParent"] | null
}) {
    const newAccounts: Array<v.InferOutput<typeof returnedSchemas.account>> = []

    parameters.accounts.forEach((account) => {
        const newAccount = {
            id: generateId(),
            idOrganization: parameters.idOrganization,
            idYear: parameters.idYear,
            idAccountParent: parameters.idAccountParent,

            idBalanceSheet: null,
            balanceSheetColumn: null,
            balanceSheetFlow: null,
            idIncomeStatement: null,

            number: account.number.toString(),
            isMandatory: account.isMandatory,
            isClass: account.isClass,
            isDefault: true,
            isSelectable: account.isSelectable,
            label: account.label,
            type: account.type,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: null,
            lastUpdatedBy: null,
        }
        newAccounts.push(newAccount)
        newAccounts.push(...generateAccounts({
            ...parameters,
            accounts: account.children,
            idAccountParent: newAccount.id
        }))
    })

    return newAccounts
}


export const generateAccountsRoute = authFactory.createApp()
    .post(
        generateAccountsRouteDefinition.path,
        bodyValidator(generateAccountsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            if (body.isReplicatingAccounts === true) {
                throw new Exception({
                    internalMessage: "Replicating accounts is not implemented yet",
                    externalMessage: "Non implémenté",
                })
            }

            const generatedAccounts = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedAccounts = await deleteMany({
                        database: tx,
                        table: models.account,
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
                        internalMessage: "Failed to delete accounts",
                        externalMessage: "Échec de la suppression des comptes",
                    })
                }

                const organization = await selectOne({
                    database: tx,
                    table: models.organization,
                    where: (table) => (
                        eq(table.id, body.idOrganization)
                    )
                })
                const defaultAccounts = (
                    (organization.scope === "association")
                        ? defaultAssociationAccounts
                        : defaultCompanyAccounts
                ).filter((account) => {
                    if (account.isMandatory === false) {
                        if (body.isMinimalSystem === true) return false
                    }
                    return true
                })

                let newAccounts = generateAccounts({
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    accounts: defaultAccounts,
                    idAccountParent: null,
                })

                const generatedAccounts = await insertMany({
                    database: tx,
                    table: models.account,
                    data: newAccounts,
                })

                return generatedAccounts
            })


            return response({
                context: c,
                statusCode: 200,
                schema: generateAccountsRouteDefinition.schemas.return,
                data: generatedAccounts,
            })
        }
    )
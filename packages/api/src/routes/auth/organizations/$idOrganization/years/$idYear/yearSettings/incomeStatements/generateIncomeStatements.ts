import {
    defaultAssociationIncomeStatements,
    defaultCompanyIncomeStatements,
} from "@arrhes/application-metadata/components"
import { models } from "@arrhes/application-metadata/models"
import { generateIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"
import type * as v from "valibot"
import { authFactory } from "../../../../../../../../factories/authFactory.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteMany } from "../../../../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../../../../utilities/sql/insertMany.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { bodyValidator } from "../../../../../../../../validators/bodyValidator.js"

export const generateIncomeStatementsRoute = authFactory
    .createApp()
    .post(
        generateIncomeStatementsRouteDefinition.path,
        bodyValidator(generateIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const generatedIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {
                try {
                    const deletedIncomeStatements = await deleteMany({
                        database: tx,
                        table: models.incomeStatement,
                        where: (table) =>
                            and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
                    })
                } catch (error: unknown) {
                    throw new Exception({
                        internalMessage: "Failed to delete incomeStatements",
                        externalMessage: "Échec de la suppression des lignes de compte de résultat",
                    })
                }

                const organization = await selectOne({
                    database: tx,
                    table: models.organization,
                    where: (table) => eq(table.id, body.idOrganization),
                })
                const defaultIncomeStatements =
                    organization.scope === "association"
                        ? defaultAssociationIncomeStatements
                        : defaultCompanyIncomeStatements

                const newIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> = []

                defaultIncomeStatements.forEach((defaultIncomeStatement) => {
                    const incomeStatementParent = newIncomeStatements.find((newIncomeStatement) => {
                        return newIncomeStatement.number === defaultIncomeStatement.numberParent?.toString()
                    })
                    newIncomeStatements.push({
                        id: generateId(),
                        idOrganization: body.idOrganization,
                        idYear: body.idYear,
                        idIncomeStatementParent: incomeStatementParent?.id ?? null,
                        number: defaultIncomeStatement.number.toString(),
                        isDefault: true,
                        isComputed: incomeStatementParent === undefined ? true : false,
                        label: defaultIncomeStatement.label,
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: null,
                        lastUpdatedBy: null,
                    })
                })

                const generatedIncomeStatements = await insertMany({
                    database: tx,
                    table: models.incomeStatement,
                    data: newIncomeStatements,
                })

                return generatedIncomeStatements
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateIncomeStatementsRouteDefinition.schemas.return,
                data: generatedIncomeStatements,
            })
        },
    )

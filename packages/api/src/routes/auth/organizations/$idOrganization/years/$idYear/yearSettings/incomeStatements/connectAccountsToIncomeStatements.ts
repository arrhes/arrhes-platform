import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { bodyValidator } from "#/validators/bodyValidator.js"


export const connectAccountsToIncomeStatementsRoute = authFactory.createApp()
    .post(
        connectAccountsIncomeStatementsRouteDefinition.path,
        bodyValidator(connectAccountsIncomeStatementsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const connectAccountsToIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {

                return []
            })


            return response({
                context: c,
                statusCode: 200,
                schema: connectAccountsIncomeStatementsRouteDefinition.schemas.return,
                data: connectAccountsToIncomeStatements,
            })
        }
    )
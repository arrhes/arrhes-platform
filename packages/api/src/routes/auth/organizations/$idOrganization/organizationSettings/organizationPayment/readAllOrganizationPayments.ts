import { models } from "@arrhes/application-metadata/models"
import { readAllOrganizationPaymentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, desc, eq } from "drizzle-orm"
import { authFactory } from "../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readAllOrganizationPaymentsRoute = authFactory
    .createApp()
    .post(readAllOrganizationPaymentsRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllOrganizationPaymentsRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, c.var.user.id), eq(table.idOrganization, body.idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
            })
        }

        const readAllOrganizationPayments = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) => eq(table.idOrganization, organizationUser.idOrganization),
            orderBy: (table) => desc(table.createdAt),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllOrganizationPaymentsRouteDefinition.schemas.return,
            data: readAllOrganizationPayments,
        })
    })

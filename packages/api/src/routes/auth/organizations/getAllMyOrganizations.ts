import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { response } from "../../../utilities/response.js"

export const getAllMyOrganizationsRoute = authFactory
    .createApp()
    .post(getAllMyOrganizationsRouteDefinition.path, async (c) => {
        const _body = await validateBodyMiddleware({
            context: c,
            schema: getAllMyOrganizationsRouteDefinition.schemas.body,
        })

        const readAllOrganizationUsers = await c.var.clients.sql.query.organizationUserModel.findMany({
            where: (table) => and(eq(table.idUser, c.var.user.id)),
            with: {
                organization: true,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: getAllMyOrganizationsRouteDefinition.schemas.return,
            data: readAllOrganizationUsers,
        })
    })

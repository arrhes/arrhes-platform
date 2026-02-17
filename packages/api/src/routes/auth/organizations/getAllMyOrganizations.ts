import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { and, eq } from "drizzle-orm"
import { authFactory } from "../../../factories/authFactory.js"
import { response } from "../../../utilities/response.js"
import { bodyValidator } from "../../../validators/bodyValidator.js"

export const getAllMyOrganizationsRoute = authFactory
    .createApp()
    .post(
        getAllMyOrganizationsRouteDefinition.path,
        bodyValidator(getAllMyOrganizationsRouteDefinition.schemas.body),
        async (c) => {
            const _body = c.req.valid("json")

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
        },
    )

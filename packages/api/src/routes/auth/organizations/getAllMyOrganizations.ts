import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { getAllMyOrganizationsRouteDefinition } from "@arrhes/schemas/routes"
import { and, eq } from "drizzle-orm"


export const getAllMyOrganizationsRoute = authFactory.createApp()
    .post(
        getAllMyOrganizationsRouteDefinition.path,
        bodyValidator(getAllMyOrganizationsRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            const readAllOrganizationUsers = await c.var.clients.sql.query.organizationUserModel.findMany({
                where: (table) => (
                    and(
                        eq(table.idUser, c.var.user.id)
                    )
                ),
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
        }
    )
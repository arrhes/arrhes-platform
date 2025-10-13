import { ApiEnv } from "#/factories/apiFactory.js"
import { AuthEnv } from "#/factories/authFactory.js"
import { PublicEnv } from "#/factories/publicFactory.js"
import { validate } from "#/utilities/validate.js"
import { routeDefinition } from "@arrhes/metadata/utilities"
import { Context } from "hono"
import { ContentfulStatusCode } from "hono/utils/http-status"
import * as v from "valibot"


type GContext = Context<ApiEnv> | Context<AuthEnv> | Context<PublicEnv>

export function response<
    TContext extends GContext,
    TSchema extends Parameters<typeof routeDefinition>[0]["schemas"]["return"],
    TData extends v.InferOutput<TSchema>
>(parameters: {
    context: TContext
    statusCode?: ContentfulStatusCode
    schema: TSchema
    data: TData
}) {

    const data = validate({
        schema: parameters.schema,
        data: parameters.data,
    })

    const jsonResponse = parameters.context.json(
        data,
        parameters.statusCode ?? 500,
        {},
    )
    return jsonResponse as Response
}
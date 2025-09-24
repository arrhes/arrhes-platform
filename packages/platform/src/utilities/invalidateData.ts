import { routeDefinition } from "@arrhes/schemas/utilities"
import { dataClient } from "contexts/data/queryClient"
import * as v from "valibot"


export async function invalidateData<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<
        string,
        TSchemaBody,
        TSchemaReturn
    >>
    body: v.InferOutput<TSchemaBody>
    exact?: boolean
}) {
    dataClient.invalidateQueries({
        queryKey: [
            parameters.routeDefinition.path,
            parameters.body
        ],
        exact: parameters.exact ?? true,
    })

}
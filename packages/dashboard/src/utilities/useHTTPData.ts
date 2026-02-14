import { routeDefinition } from "@arrhes/application-metadata/utilities"
import { useQuery } from "@tanstack/react-query"
import * as v from "valibot"
import { ClientError } from "./clientError.js"
import { postAPI } from "./postAPI.js"



export function useDataFromAPI<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends v.ObjectSchema<v.ObjectEntries, undefined> | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
>(
    parameters: {
        routeDefinition: ReturnType<typeof routeDefinition<
            string,
            TSchemaBody,
            TSchemaReturn
        >>
        body: v.InferOutput<TSchemaBody>
        enabled?: boolean
    }
) {
    return useQuery({
        queryKey: [
            parameters.routeDefinition.path,
            parameters.body
        ],
        queryFn: async (context) => {

            const response = await postAPI({
                routeDefinition: parameters.routeDefinition,
                body: parameters.body,
                signal: context.signal,
            })
            if (response.ok === false) {
                throw new ClientError({
                    message: "Error with the data fetching",
                    rawError: response.error,
                })
            }

            return response.data
        },
        retry: 1,
        enabled: parameters.enabled ?? true,
    })
}

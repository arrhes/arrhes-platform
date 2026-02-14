import { toast } from "../contexts/toasts/useToast.js"
import { routeDefinition } from "@arrhes/application-metadata/utilities"
import * as v from "valibot"
import { ClientError } from "./clientError.js"
import { validate } from "./validate.js"


export async function postAPI<
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
        hasToastMessage?: boolean,
        signal?: AbortSignal
    }
) {
    const abortController = new AbortController()
    try {
        const response = await fetch(
            new URL(`${import.meta.env.VITE_API_BASE_URL}${parameters.routeDefinition.path}`),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(parameters.body),
                signal: parameters.signal ?? abortController.signal
            }
        )
        const jsonResponse = JSON.parse(await response.text() || "{}")
        if (response.ok === false) {
            throw new ClientError({
                message: "Error with the POST request response",
                cause: jsonResponse.message,
            })
        }

        const parsedData = validate({
            schema: parameters.routeDefinition.schemas.return,
            data: jsonResponse
        })

        if (parsedData.success === false) {
            throw new ClientError({
                message: "Error with the POST request body data validation",
                rawError: parsedData.error,
            })
        }

        return <const>{
            ok: true,
            data: parsedData.data,
            error: undefined
        }
    } catch (error: unknown) {
        abortController.abort()

        if (parameters.hasToastMessage) {
            toast({ title: "Error with the API.", variant: "error" })
        }

        return <const>{
            ok: false,
            data: undefined,
            error: new ClientError({
                rawError: error,
            }),
        }
    }
}
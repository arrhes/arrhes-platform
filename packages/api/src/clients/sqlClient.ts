import { Exception } from "#src/utilities/exception.js"
import { getEnv } from "#src/utilities/getEnv.js"
import { modelSchemas } from "@arrhes/schemas/models"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"


export function sqlClient(env: ReturnType<typeof getEnv>) {
    try {
        const queryClient = postgres(env.SQL_DATABASE_URL)
        const db = drizzle(queryClient, { schema: modelSchemas })
        return db
    }
    catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "SQL client not available",
            rawError: error,
        })
    }
}
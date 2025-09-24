import { sqlClient } from "#/clients/sqlClient.js"
import { Exception } from "#/utilities/exception.js"
import { SQL, TableConfig } from "drizzle-orm"
import { PgTable } from "drizzle-orm/pg-core"


export async function deleteMany<
    T extends PgTable<TableConfig>
>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .delete(parameters.table)
            .where(
                (parameters.where === undefined)
                    ? undefined
                    : parameters.where(parameters.table)
            )
            .returning()

        return responseMany
    }
    catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Not available",
            rawError: error
        })
    }
}
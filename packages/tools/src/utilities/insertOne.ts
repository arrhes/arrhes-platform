import { dbClient } from "#/dbClient.js"
import { TableConfig } from "drizzle-orm"
import { PgInsertValue, PgTable } from "drizzle-orm/pg-core"


export async function insertOne<
    T extends PgTable<TableConfig>
>(parameters: {
    database: typeof dbClient | Parameters<Parameters<typeof dbClient["transaction"]>[0]>[0]
    table: T
    data: PgInsertValue<T>
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database
            .insert(parameters.table)
            .values(parameters.data)
            .returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Error("Object not inserted")
        }

        return responseOne
    }
    catch (error: unknown) {
        throw new Error("Object not inserted")
    }
}
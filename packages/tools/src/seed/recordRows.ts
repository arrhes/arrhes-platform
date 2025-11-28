import { modelSchemas } from "@arrhes/metadata/models"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from '../env.js'


const connection = postgres(env()?.DATABASE_URL ?? "", { max: 1 })
const db = drizzle(connection, { schema: modelSchemas })


async function recordRows() {
    try {
        await db.transaction(async (tx) => {


            // recordrows
            const recordRows = await tx.query.recordRowModel.findMany({
                where: (table) => (
                    and(
                        eq(table.idOrganization, "lt9m-dvre-y2s2-2fj6")
                    )
                ),
                with: {
                    record: true,
                },
            })

            console.log(recordRows)
        })

    } catch (error) {
        console.log(error)
    }
}

console.log("recordRows starting.")
await recordRows()

process.exit()

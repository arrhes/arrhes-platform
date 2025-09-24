import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from '../env.js'


const connection = postgres(env()?.DATABASE_URL ?? "", { max: 1 })
const db = drizzle(connection)

async function migration() {
    try {
        await db.transaction(async (tx) => {

        })

    } catch (error) {
        console.log(error)
    }
}

await migration()
process.exit()

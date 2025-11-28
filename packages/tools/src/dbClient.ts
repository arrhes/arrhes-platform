import { env } from "#/env.js"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"


const connection = postgres(env()?.DATABASE_URL ?? "", { max: 1 })
export const dbClient = drizzle(connection)

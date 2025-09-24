import type { Config } from "drizzle-kit"
import { env } from "./src/env"


export default {
    schema: "./src/schemas.ts",
    out: "./drizzle",
    dialect: "postgresql",
    strict: true,
    dbCredentials: {
        url: env()?.DATABASE_URL ?? "",
    },
    verbose: true,
} satisfies Config

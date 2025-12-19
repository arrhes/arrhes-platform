import { validate } from "#/utilities/validate.js"
import * as v from "valibot"


enum Env {
    development = "development",
    production = "production"
}

const envSchema = v.object({
    ENV: v.enum_(Env),
    VERBOSE: v.picklist(["true", "false"]),
    PORT: v.string(),

    CORS_ORIGIN: v.string(),
    COOKIES_DOMAIN: v.string(),
    COOKIES_KEY: v.string(),

    API_BASE_URL: v.string(),
    PLATFORM_BASE_URL: v.string(),
    WEBSITE_BASE_URL: v.string(),

    SQL_DATABASE_URL: v.string(),

    STORAGE_ENDPOINT: v.string(),
    STORAGE_BUCKET_NAME: v.string(),
    STORAGE_ACCESS_KEY: v.string(),
    STORAGE_SECRET_KEY: v.string(),

    EMAIL_ENDPOINT: v.string(),
    EMAIL_USER: v.string(),
    EMAIL_PASSWORD: v.string(),
})


export function getEnv() {
    const parsedEnv = validate({
        schema: envSchema,
        // @ts-ignore
        data: process.env,
        message: "Missing environment variables",
    })

    return parsedEnv
}

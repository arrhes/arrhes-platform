import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoYearId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"

let session: AuthSession
let idOrganization: string
let idYear: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    const demo = await getDemoYearId(session)
    idOrganization = demo.idOrganization
    idYear = demo.idYear
})

describe("Attachments", () => {
    describe("POST /auth/read-all-attachments", () => {
        it("returns all attachments for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-attachments",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            // Seed data may or may not have attachments
        })
    })
})

describe("Documents", () => {
    describe("POST /auth/read-all-documents", () => {
        it("returns all documents for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-documents",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            // Seed data may or may not have documents
        })
    })
})

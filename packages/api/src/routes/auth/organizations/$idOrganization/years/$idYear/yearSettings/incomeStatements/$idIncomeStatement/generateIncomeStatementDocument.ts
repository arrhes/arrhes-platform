import { authFactory } from "#src/factories/authFactory.js"
import { response } from "#src/utilities/response.js"
import { insertOne } from "#src/utilities/sql/insertOne.js"
import { bodyValidator } from "#src/validators/bodyValidator.js"
import { models } from "@arrhes/schemas/models"
import { generateIncomeStatementDocumentRouteDefinition } from "@arrhes/schemas/routes"
import { generateId } from "@arrhes/schemas/utilities"


export const generateIncomeStatementDocumentRoute = authFactory.createApp()
    .post(
        generateIncomeStatementDocumentRouteDefinition.path,
        bodyValidator(generateIncomeStatementDocumentRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            //  const readIncomeStatements = await db.query.incomeStatements.findMany({
            //     where: and(
            //         eq(incomeStatements.idOrganization, c.var.user.idOrganization),
            //         eq(incomeStatements.idYear, c.var.currentYear.id)
            //     ),
            //     with: {
            //         accountIncomeStatements: true
            //     }
            // })
            // const readRows = (await db.query.records.findMany({
            //     where: and(
            //         eq(records.idOrganization, c.var.user.idOrganization),
            //         eq(records.idYear, c.var.currentYear.id),
            //         eq(records.isComputed, true)
            //     ),
            //     with: {
            //         rows: true
            //     }
            // }))
            //     .flatMap((record) => record.rows)

            // const readAccounts = await db.query.accounts.findMany({
            //     where: and(
            //         eq(accounts.idOrganization, c.var.user.idOrganization),
            //         eq(accounts.idYear, c.var.currentYear.id)
            //     )
            // })
            // const readComputations = await db.query.computations.findMany({
            //     where: and(
            //         eq(computations.idOrganization, c.var.user.idOrganization),
            //         eq(computations.idYear, c.var.currentYear.id)
            //     ),
            //     with: {
            //         computationIncomeStatements: true
            //     }
            // })

            // const balance = getBalance(readRows, readAccounts)
            // const sortedIncomeStatements = groupIncomeStatements(readIncomeStatements, balance, null)
            //     .sort((a, b) => a.number - b.number)
            // const sortedComputations = (readComputations)
            //     .sort((a, b) => a.number - b.number)


            // const browser = await launch({
            //     executablePath: '/usr/bin/chromium-browser',
            //     args: [
            //         '--no-sandbox'
            //     ],
            //     headless: true,
            //     defaultViewport: {
            //         width: 2480,
            //         height: 3508,
            //         deviceScaleFactor: 1
            //     }
            // })
            // const page = await browser.newPage()

            // const htmlResponse = await c.html(incomeStatementTemplate({
            //     incomeStatements: sortedIncomeStatements,
            //     computations: sortedComputations
            // }))
            // const htmlString = await htmlResponse.text()
            // await page.setContent(htmlString)

            // await page.addStyleTag({
            //     content: `
            //         @page {
            //             margin: 32px;
            //         }
            //         * {
            //             box-sizing: border-box;
            //         }
            //         body {
            //             margin: 0;
            //         }
            //     `
            // })
            // const height = await page.evaluate(() => {
            //     const body = document.body
            //     const html = document.documentElement
            //     return Math.max(body.scrollHeight, html.scrollHeight)
            // })
            // const pdf = await page.pdf({
            //     height: `${height}px`,
            //     landscape: false,
            //     printBackground: true,
            //     preferCSSPageSize: true,
            //     margin: {
            //         top: 0,
            //         right: 0,
            //         bottom: 0,
            //         left: 0
            //     }
            // })

            // await browser.close()

            const createOneDocument = await insertOne({
                database: c.var.clients.sql,
                table: models.document,
                data: {
                    id: generateId(),
                    idOrganization: body.idOrganization,
                    idYear: body.idYear,
                    label: "",
                    type: "compte_de_résultat",
                    storageKey: "",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: c.var.user.id,
                    lastUpdatedBy: null,
                }
            })

            return response({
                context: c,
                statusCode: 200,
                schema: generateIncomeStatementDocumentRouteDefinition.schemas.return,
                data: createOneDocument,
            })
        }
    )
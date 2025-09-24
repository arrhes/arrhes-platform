import { authFactory } from "#/factories/authFactory.js"
import { response } from "#/utilities/response.js"
import { insertOne } from "#/utilities/sql/insertOne.js"
import { bodyValidator } from "#/validators/bodyValidator.js"
import { models } from "@arrhes/metadata/models"
import { generateBalanceSheetDocumentRouteDefinition } from "@arrhes/metadata/routes"
import { generateId } from "@arrhes/metadata/utilities"


export const generateBalanceSheetDocumentRoute = authFactory.createApp()
    .post(
        generateBalanceSheetDocumentRouteDefinition.path,
        bodyValidator(generateBalanceSheetDocumentRouteDefinition.schemas.body),
        async (c) => {
            const body = c.req.valid("json")

            // const readBalanceSheets = await db.query.balanceSheets.findMany({
            //     where: and(
            //         eq(balanceSheets.idOrganization, c.var.user.idOrganization),
            //         eq(balanceSheets.idYear, c.var.currentYear.id)
            //     ),
            //     with: {
            //         accountBalanceSheets: true
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

            // const balance = getBalance(readRows, readAccounts)
            // const balanceSheetAssets = groupBalanceSheetsAssets(readBalanceSheets.filter((balanceSheet) => balanceSheet.side === "asset"), balance, null)
            //     .sort((a, b) => a.number - b.number)
            // const balanceSheetLiabilities = groupBalanceSheetsLiabilities(readBalanceSheets.filter((balanceSheet) => balanceSheet.side === "liability"), balance, null)
            //     .sort((a, b) => a.label.localeCompare(b.label))


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

            // const htmlResponse = await c.html(balanceSheetTemplate({
            //     balanceSheetAssets: balanceSheetAssets,
            //     balanceSheetLiabilities: balanceSheetLiabilities
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
                    type: "bilan",
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
                schema: generateBalanceSheetDocumentRouteDefinition.schemas.return,
                data: createOneDocument,
            })
        }
    )
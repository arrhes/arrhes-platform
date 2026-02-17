import path from "node:path"
import { fileURLToPath } from "node:url"
import { models } from "@arrhes/application-metadata/models"
import { generateBalanceSheetReportDocumentRouteDefinition } from "@arrhes/application-metadata/routes"
import { generateId } from "@arrhes/application-metadata/utilities"
import { and, eq } from "drizzle-orm"
import { launch } from "puppeteer"
import { authFactory } from "../../../../../../../factories/authFactory.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { balanceSheetReportTemplate } from "../../../../../../../utilities/email/templates/balanceSheetReport/balanceSheetReport.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"
import { putObject } from "../../../../../../../utilities/storage/putObject.js"

export const generateBalanceSheetReportDocumentRoute = authFactory
    .createApp()
    .post(generateBalanceSheetReportDocumentRouteDefinition.path, async (c) => {
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateBalanceSheetReportDocumentRouteDefinition.schemas.body,
        })

        const readAllRecordRows = await selectMany({
            database: c.var.clients.sql,
            table: models.recordRow,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllAccounts = await selectMany({
            database: c.var.clients.sql,
            table: models.account,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllBalanceSheets = await selectMany({
            database: c.var.clients.sql,
            table: models.balanceSheet,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idYear, body.idYear)),
        })

        const browser = await launch({
            // executablePath: '/usr/bin/chromium-browser',
            args: ["--no-sandbox"],
            headless: true,
            // defaultViewport: {
            //     width: 2480,
            //     height: 3508,
            //     deviceScaleFactor: 1
            // }
        })
        const page = await browser.newPage()

        const htmlResponse = await c.html(
            balanceSheetReportTemplate({
                accounts: readAllAccounts,
                recordRows: readAllRecordRows,
                balanceSheets: readAllBalanceSheets,
            }),
        )
        const htmlString = await htmlResponse.text()
        await page.setContent(htmlString)

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const fontPath = path.resolve(
            __dirname,
            "./packages/api/src/utilities/email/templates/fonts/SometypeMono-VariableFont_wght.ttf",
        )
        await page.addStyleTag({
            content: `
                @font-face {
                    font-family: "Sometype Mono";
                    src: url("file://${fontPath}") format("truetype");
                    font-style: normal;
                    font-weight: 400 500 600 700;
                    font-display: auto;
                }
                * {
                    box-sizing: border-box;
                    font-family: "Sometype Mono", sans-serif;
                }
                body {
                    margin: 0;
                }
            `,
        })
        // const height = await page.evaluate(() => {
        //     const body = document.body
        //     const html = document.documentElement
        //     return Math.max(body.scrollHeight, html.scrollHeight)
        // })

        const bodyHandle = await page.$("body")
        const boundingBox = await bodyHandle?.boundingBox()
        await bodyHandle?.dispose()

        const pdfBuffer = await page.pdf({
            landscape: false,
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            width: `${boundingBox?.width}px`,
            height: `${(boundingBox?.height ?? 0) + 64 + 16}px`,
            pageRanges: "1",
        })
        const pdfBody = Buffer.from(pdfBuffer)

        await browser.close()

        const idDocument = generateId()
        const storageKey = `organizations/${body.idOrganization}/${body.idYear}/reports/${idDocument}`
        await putObject({
            var: c.var,
            body: pdfBody,
            storageKey: storageKey,
            contentType: "application/pdf",
            contentLength: pdfBody.length,
            metadata: {
                idOrganization: body.idOrganization,
                idYear: body.idYear,
                idUser: c.var.user.id,
            },
        })

        const createOneDocument = await insertOne({
            database: c.var.clients.sql,
            table: models.document,
            data: {
                id: idDocument,
                idOrganization: body.idOrganization,
                idYear: body.idYear,
                label: `bilan-${body.idOrganization}-${body.idYear}`,
                type: "bilan",
                storageKey: storageKey,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: c.var.user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateBalanceSheetReportDocumentRouteDefinition.schemas.return,
            data: createOneDocument,
        })
    })

import { BalanceSheetAssets } from "#/utilities/email/templates/balanceSheet/balanceSheetAssets.js"
import { BalanceSheetLiabilities } from "#/utilities/email/templates/balanceSheet/balanceSheetLiabilities.js"
import { BalanceSheetAsset } from "#/utilities/email/templates/balanceSheet/groupBalanceSheetsAssets.js"
import { BalanceSheetLiability } from "#/utilities/email/templates/balanceSheet/groupBalanceSheetsLiabilities.js"
import { Style, css } from "hono/css"


function BalanceSheet(props: {
    balanceSheetAssets: Array<BalanceSheetAsset>
    balanceSheetLiabilities: Array<BalanceSheetLiability>
}) {
    return (
        <html lang="fr">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Style />
            </head>
            <body class={css`width: fit-content; height: 100%; overflow: scroll;`}>
                <div class={css`width: fit-content; min-height:fit-content; overflow: scroll;`}>
                    <BalanceSheetAssets balanceSheets={props.balanceSheetAssets} />
                    <BalanceSheetLiabilities balanceSheets={props.balanceSheetLiabilities} />
                </div>
            </body>
        </html>
    )
}

export function balanceSheetTemplate(props: Parameters<typeof BalanceSheet>[0]) {
    return (<BalanceSheet {...props} />).toString()
}

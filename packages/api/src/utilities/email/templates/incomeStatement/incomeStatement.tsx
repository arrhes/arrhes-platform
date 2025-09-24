import { IncomeStatementItem } from "#src/utilities/email/templates/incomeStatement/groupIncomeStatements.js"
import { IncomeStatementTable } from "#src/utilities/email/templates/incomeStatement/incomeStatements.js"
import { schemas } from "@arrhes/schemas/schemas"
import { Style, css } from "hono/css"
import * as v from "valibot"


function IncomeStatement(props: {
    incomeStatements: Array<IncomeStatementItem>
    computations: Array<
        & v.InferOutput<typeof schemas.computation>
        & {
            computationIncomeStatements: Array<v.InferOutput<typeof schemas.computationIncomeStatement>>
        }
    >
}) {
    return (
        <html lang="fr">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Style />
            </head>
            <body class={css`width: fit-content; height: 100%; overflow: scroll;`}>
                <div class={css`width: fit-content; min-height:fit-content; overflow: scroll;`}>
                    <IncomeStatementTable
                        incomeStatements={props.incomeStatements}
                        computations={props.computations}
                    />
                </div>
            </body>
        </html>
    )
}

export function incomeStatementTemplate(props: Parameters<typeof IncomeStatement>[0]) {
    return (<IncomeStatement {...props} />).toString()
}

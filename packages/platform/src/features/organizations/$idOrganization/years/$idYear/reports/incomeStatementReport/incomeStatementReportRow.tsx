import { FormatPrice } from "#/components/formats/formatPrice.js"
import { FormatText } from "#/components/formats/formatText.js"
import { Table } from "#/components/layouts/table/table.js"
import { cn } from "#/utilities/cn.js"


export function IncomeStatementReportRow(props: {
    level: number
    number: string | null
    label: string
    amount: number
    isAmountDisplayed: boolean
}) {

    return (
        <Table.Body.Row
            className={cn(
                "",
                props.number ? "bg-neutral/5" : ""
            )}
        >
            <Table.Body.Cell style={{ paddingLeft: `${props.level * 16 + 8}px` }} >
                <FormatText
                    className={cn(
                        "whitespace-normal",
                        props.number ? "font-bold" : ""
                    )}
                >
                    {props.number} {props.label}
                </FormatText>
            </Table.Body.Cell>
            <Table.Body.Cell className="w-[1%]" align="right">
                {
                    (props.isAmountDisplayed === true)
                        ? (
                            <FormatPrice price={props.amount} />
                        )
                        : (null)
                }
            </Table.Body.Cell>
        </Table.Body.Row>
    )
}

import { returnedSchemas } from "@arrhes/schemas/schemas"
import { FormatNull } from "components/formats/formatNull"
import { Table } from "components/layouts/table/table"
import { BalanceSheetLiabilityBody } from "features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetLiabilityBody"
import * as v from "valibot"


export function BalanceSheetLiabilitiesTable(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    return (
        <Table.Root>
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell />
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">
                            Net
                        </span>
                    </Table.Header.Cell>
                </Table.Header.Row>
            </Table.Header.Root>
            <Table.Body.Root>
                {
                    (props.balanceSheets.length === 0)
                        ? (
                            <Table.Body.Root className="border-b border-neutral/10 last:border-b-0">
                                <Table.Body.Row>
                                    <Table.Body.Cell>
                                        <FormatNull />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : (
                            <BalanceSheetLiabilityBody
                                balanceSheets={props.balanceSheets}
                                balanceSheetParent={null}
                                increment={0}
                                displayNumber={true}
                            />
                        )
                }
            </Table.Body.Root>
        </Table.Root>
    )
}

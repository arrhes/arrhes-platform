import { FormatNull } from "#/components/formats/formatNull.js"
import { Table } from "#/components/layouts/table/table.js"
import { BalanceSheetAssetBody } from "#/features/organizations/$idOrganization/years/$idYear/reports/balanceSheetReport/balanceSheetAssetBody.js"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function BalanceSheetAssetsTable(props: {
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    return (
        <Table.Root className="">
            <Table.Header.Root>
                <Table.Header.Row>
                    <Table.Header.Cell />
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">Brut</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm whitespace-nowrap">Amort. & Dépré.</span>
                    </Table.Header.Cell>
                    <Table.Header.Cell className="w-[1%]" align="right">
                        <span className="text-neutral/75 text-sm">Net</span>
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
                                        <FormatNull className="" />
                                    </Table.Body.Cell>
                                </Table.Body.Row>
                            </Table.Body.Root>
                        )
                        : (
                            <BalanceSheetAssetBody
                                balanceSheets={props.balanceSheets}
                                balanceSheetParent={null}
                                recordRows={props.recordRows}
                                accounts={props.accounts}
                                increment={0}
                                displayNumber={true}
                            />
                        )
                }
            </Table.Body.Root>
        </Table.Root>
    )
}

import { TableBodyCell } from "./tableBody/tableBodyCell"
import { TableBodyRoot } from "./tableBody/tableBodyRoot"
import { TableBodyRow } from "./tableBody/tableBodyRow"
import { TableHeaderCell } from "./tableHeader/tableHeaderCell"
import { TableHeaderRoot } from "./tableHeader/tableHeaderRoot"
import { TableHeaderRow } from "./tableHeader/tableHeaderRow"
import { TableRoot } from "./tableRoot"


export const Table = {
    Root: TableRoot,
    Header: {
        Root: TableHeaderRoot,
        Row: TableHeaderRow,
        Cell: TableHeaderCell
    },
    Body: {
        Root: TableBodyRoot,
        Row: TableBodyRow,
        Cell: TableBodyCell
    }
}

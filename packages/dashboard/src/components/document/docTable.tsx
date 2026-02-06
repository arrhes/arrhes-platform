import { css } from "../../utilities/cn.js"


export function DocTable(props: {
    headers: string[]
    rows: string[][]
}) {
    return (
        <div className={css({ overflowX: "auto", mb: "4" })}>
            <table className={css({
                w: "full",
                border: "1px solid",
                borderColor: "neutral/10",
                rounded: "lg",
                overflow: "hidden"
            })}>
                <thead className={css({ bg: "neutral/5" })}>
                    <tr>
                        {props.headers.map((header, index) => (
                            <th key={index} className={css({
                                px: "4",
                                py: "2",
                                textAlign: "left",
                                fontSize: "sm",
                                fontWeight: "medium",
                                color: "neutral"
                            })}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={css({
                            borderTop: "1px solid",
                            borderColor: "neutral/10"
                        })}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className={css({
                                    px: "4",
                                    py: "2",
                                    fontSize: "sm",
                                    color: "neutral/80"
                                })}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

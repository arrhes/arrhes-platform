import { Style } from "hono/css"
import { DOMAttributes } from "hono/jsx"
import { JSX } from "hono/jsx/jsx-runtime"


export function TableHeaderRow(props: {
    children: JSX.Element | JSX.Element[]
    class?: DOMAttributes["class"]
}) {
    return (
        <>
            <Style />
            <tr
                // style={cx(
                //     css`width: 100%;`,
                //     props.class
                // )}
                children={props.children}
            />
        </>
    )
}

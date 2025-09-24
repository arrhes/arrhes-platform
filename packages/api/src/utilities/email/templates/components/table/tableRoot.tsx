import { Style, css, cx } from "hono/css"
import { DOMAttributes, } from "hono/jsx"
import { JSX } from "hono/jsx/jsx-runtime"


export function TableRoot(props: {
    children: JSX.Element | JSX.Element[]
    class?: DOMAttributes["class"]
}) {
    return (
        <>
            <Style />
            <table
                class={cx(
                    css`width: 100%; height: fit-content; border-collapse: separate; border-spacing: 0; border: 1px solid #111111;`,
                    props.class
                )}
                children={props.children}
            />
        </>
    )
}

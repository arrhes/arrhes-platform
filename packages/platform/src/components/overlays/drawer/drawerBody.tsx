import { JSX } from "react"


export function DrawerBody(props: {
    children: JSX.Element
}) {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 p-4">
            {props.children}
        </div>
    )
}

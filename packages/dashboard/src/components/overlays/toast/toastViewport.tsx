import { createPortal } from "react-dom"
import { ReactNode } from "react"
import { css } from "../../../utilities/cn.js"


type ToastViewportProps = {
    children: ReactNode
}

export function ToastViewport(props: ToastViewportProps) {
    return createPortal(
        <div
            className={css({
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex: "100",
                display: "flex",
                flexDirection: "column",
                gap: "2",
                padding: "4",
                width: "100%",
                maxWidth: "420px",
                pointerEvents: "none",
            })}
        >
            {props.children}
        </div>,
        document.body
    )
}

import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function PageRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    paddingY: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowY: "auto",
                    gap: "1rem",
                    backgroundColor: "white",
                    md: {
                        gap: "8"
                    }
                }),
                props.className
            )}
            children={props.children}
        />
    )
}

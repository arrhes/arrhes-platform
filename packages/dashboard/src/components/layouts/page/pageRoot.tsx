import { css, cx } from "../../../utilities/cn.js"
import { ComponentProps, ReactElement } from "react"


type PageRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function PageRoot(props: PageRoot) {
    return (
        <div
            className={cx(
                css({
                    w: "full",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflow: "auto",
                    p: "4",
                    gap: "4",
                    bg: "white",
                    borderTop: "1px solid",
                    borderColor: "neutral/10",
                    md: {
                        p: "8",
                        gap: "8"
                    }
                }),
                props.className
            )}
            children={props.children}
        />
    )
}

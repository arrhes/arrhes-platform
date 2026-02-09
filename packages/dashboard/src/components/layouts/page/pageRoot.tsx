import { ComponentProps, ReactElement } from "react"
import { css, cx } from "../../../utilities/cn.js"


type PageRoot = {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<'div'>['className']
}

export function PageRoot(props: PageRoot) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowidth: "auto",
                    p: "4",
                    gap: "4",
                    backgroundColor: "white",
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

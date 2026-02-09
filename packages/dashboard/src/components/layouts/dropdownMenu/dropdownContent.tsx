import { DropdownMenuContent, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"
import { css, cx } from "../../../utilities/cn.js"



export function DropdownContent(props:
    ComponentPropsWithRef<typeof DropdownMenuContent>
) {
    return (
        <DropdownMenuPortal>
            <DropdownMenuContent
                {...props}
                align={props.align || "start"}
                alignOffset={props.alignOffset || 0}
                side={props.side || "bottom"}
                sideOffset={props.sideOffset || 6}
                className={cx(
                    css({
                        backgroundColor: "white",
                        rounded: "md",
                        p: "2",
                        shadowidth: "lg",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "0",
                        border: "1px solid",
                        borderColor: "neutral/20",
                        minwidth: "var(--radix-dropdown-menu-trigger-width)"
                    }),
                    props.className
                )}
            >
                {props.children}
            </DropdownMenuContent>
        </DropdownMenuPortal>
    )
}
import { css, cx } from "../../../utilities/cn.js"
import { DropdownMenuContent, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithRef } from "react"



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
                        bg: "white",
                        rounded: "md",
                        p: "2",
                        shadow: "lg",
                        display: "flex",
                        flexDir: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "0",
                        border: "1px solid",
                        borderColor: "neutral/20",
                        minW: "var(--radix-dropdown-menu-trigger-width)"
                    }),
                    props.className
                )}
            >
                {props.children}
            </DropdownMenuContent>
        </DropdownMenuPortal>
    )
}
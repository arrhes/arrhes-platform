
import { ButtonContent } from "@arrhes/ui"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { HTMLAttributes } from "react"
import { css, cx } from "../../../utilities/cn.js"


export function DialogHeader(props:
    HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                }),
                props.className
            )}
        >
            <div className={css({
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5rem",
            })}>
                {props.children}
            </div>
            <DialogPrimitive.Close asChild>
                <button
                    type="button"
                    aria-label="Fermer"
                    className={css({ display: "flex", alignItems: "center" })}
                >
                    <ButtonContent
                        variant="invisible"
                        leftIcon={<IconX />}
                    />
                </button>
            </DialogPrimitive.Close>
        </div>
    )
}
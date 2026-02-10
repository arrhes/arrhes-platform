
import { ButtonContent } from "@arrhes/ui"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { css } from "../../../utilities/cn.js"


export function DrawerHeader(props: {
    title: string | undefined
}) {
    return (
        <div className={css({
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            borderBottom: "1px solid",
            borderBottomColor: "neutral/10",
            padding: "1rem"
        })}>
            <DialogPrimitive.Title>
                {
                    (props.title === undefined)
                        ? (null)
                        : (
                            <span className={css({ fontSize: "2xl" })}>
                                {props.title}
                            </span>
                        )
                }
            </DialogPrimitive.Title>
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

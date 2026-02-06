
import { Button } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"


export function DrawerHeader(props: {
    title: string | undefined
}) {
    return (
        <div className={css({
            w: "full",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "4",
            borderBottom: "1px solid",
            borderColor: "neutral/5",
            p: "4"
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
                <Button
                    variant="invisible"
                    icon={<IconX />}
                />
            </DialogPrimitive.Close>
        </div>
    )
}


import { ButtonGhost } from "#/components/buttons/buttonGhost.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"


export function DrawerHeader(props: {
    title: string | undefined
}) {
    return (
        <div className="w-full flex justify-between items-start gap-4 border-b border-neutral/5 p-4">
            <DialogPrimitive.Title>
                {
                    (props.title === undefined)
                        ? (null)
                        : (
                            <span className="text-2xl">
                                {props.title}
                            </span>
                        )
                }
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
                <ButtonGhost
                    icon={<IconX />}
                />
            </DialogPrimitive.Close>
        </div>
    )
}

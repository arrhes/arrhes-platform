import { Button } from "@arrhes/ui"
import { css } from "../../utilities/cn.js"


export type FormSubmit<T> = {
    previousLabel?: string
    previousCallback?: (data?: T) => Promise<void>
    nextLabel: string
    nextCallback: (data?: T) => Promise<void>
    stepCount?: string
    stepName?: string
}


export function FormSubmit<T>(props: FormSubmit<T>) {
    const handleNext = async () => {
        await props.nextCallback()
    }

    const handlePrevious = () => {
        if (props.previousCallback === undefined) return undefined
        props.previousCallback()
    }

    return (
        <div className={css({ w: "full", mt: "auto", display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "stretch", gap: "2" })}>
            <div className={css({ w: "full", display: "flex", flexDir: "row", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                {
                    (props.previousCallback === undefined) ? null : (
                        <Button
                            variant="invisible"
                            text={props.previousLabel}
                            onClick={handlePrevious}
                        />
                    )
                }
                <Button
                    variant="primary"
                    text={props.nextLabel}
                    onClick={handleNext}
                    hasLoader
                />
            </div>
            {(!props.stepCount && !props.stepName) ? null :
                <div className={css({ w: "full", display: "flex", flexDir: "row", justifyContent: "flex-end", alignItems: "center", gap: "1" })}>
                    {(!props.stepCount) ? null : <span className={css({ fontSize: "sm", color: "neutral/50" })}>{props.stepCount}</span>}
                    {(!props.stepName) ? null : <span className={css({ fontSize: "sm", color: "neutral/50" })}>{props.stepName}</span>}
                </div>
            }
        </div>
    )
}

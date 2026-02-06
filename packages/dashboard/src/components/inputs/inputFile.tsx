import { Button } from "@arrhes/ui"
import { css } from "../../utilities/cn.js"
import { InputHTMLAttributes, useRef } from 'react'
import { FieldError } from 'react-hook-form'


export function InputFile(props:
    & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: File | null
        onChange?: (value?: File | null | undefined) => void
        type?: "image"
    }
) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    // useImperativeHandle(props.ref, () => inputRef.current as HTMLInputElement)

    return (
        <div
            className={css({
                w: "full",
                border: "1px solid",
                borderColor: "neutral/20",
                borderStyle: "dashed",
                _hover: { bg: "neutral/5" },
                rounded: "sm",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            })}
            onDrop={(event) => {
                event.preventDefault()
                if (!props.onChange) return
                if (event.dataTransfer.files) {
                    props.onChange(event.dataTransfer.files[0])
                }
            }}
            onDragOver={(event) => event.preventDefault()}
        >
            <input
                ref={inputRef}
                multiple={false}
                type="file"
                onChange={(event) => {
                    if (!props.onChange) return
                    if (event.target.files) {
                        props.onChange(event.target.files[0])
                    }
                }}
                accept={!props.type ? "*" : "image/*"}
                className={css({ display: "none", w: "full", h: "full" })}
            />
            <Button
                onClick={(_event) => { inputRef.current?.click() }}
                className={css({
                    cursor: "pointer",
                    w: "full",
                    h: "full",
                    p: { base: "2", md: "3" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                })}
            >
                <span className={css({ color: "neutral/75" })}>
                    {props.value?.name ?? props.placeholder ?? "Glissez-déposez ou cliquez pour ajouter un fichier"}
                </span>
            </Button>
        </div>
    )
}

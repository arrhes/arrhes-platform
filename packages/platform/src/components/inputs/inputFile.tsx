import { Button } from 'components/buttons/button'
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
            className="w-full border border-neutral/20 border-dashed hover:bg-neutral/5 rounded-sm flex justify-center items-center"
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
                className="hidden w-full h-full"
            />
            <Button
                onClick={(_event) => { inputRef.current?.click() }}
                className="cursor-pointer w-full h-full p-2 md:p-3 flex justify-center items-center"
            >
                <span className="text-neutral/75">
                    {props.value?.name ?? props.placeholder ?? "Glissez-déposez ou cliquez pour ajouter un fichier"}
                </span>
            </Button>
        </div>
    )
}

import { css } from "@arrhes/ui/utilities/cn.js"
import { InputDebounced } from "../inputs/inputDebounced.js"
import { InputText } from "../inputs/inputText.js"

export function SearchBar(props: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    return (
        <div
            className={css({
                flexShrink: "0",
                width: "100%",
                maxWidth: "sm",
                height: "fit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
            })}
        >
            <InputDebounced value={props.value} onChange={(value) => props.onChange(value ?? "")}>
                <InputText placeholder={props.placeholder ?? "Recherche"} className={css({ maxWidth: "320px" })} />
            </InputDebounced>
        </div>
    )
}

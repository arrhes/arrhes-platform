import { InputCombobox } from "#/components/inputs/inputCombobox.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { routeDefinition } from "@arrhes/metadata/utilities"
import * as v from "valibot"


export function InputDataCombobox<
    TRouteDefinition extends ReturnType<typeof routeDefinition>
>(props: {
    routeDefinition: TRouteDefinition
    body: v.InferInput<TRouteDefinition["schemas"]["body"]>
    placeholder?: string
    getOption: (data: v.InferOutput<TRouteDefinition["schemas"]["return"]>[number]) => ({ key: string, label: string })
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const response = useHTTPData({
        routeDefinition: props.routeDefinition,
        body: props.body,
    })

    return (
        <InputCombobox
            key={response.status}
            value={props.value}
            onChange={props.onChange}
            isLoading={response.isPending}
            allowEmpty={true}
            placeholder={props.placeholder ?? "Sélectionner un élément"}
            options={
                (response.data === undefined)
                    ? []
                    : Array.isArray(response.data)
                        ? response.data?.map((item) => props.getOption(item))
                        : [props.getOption(response.data)]
            }
        />
    )
}

import { InputCombobox } from "#/components/inputs/inputCombobox.js"
import { useHTTPData } from "#/utilities/useHTTPData.js"
import { readAllAccountsRouteDefinition } from "@arrhes/metadata/routes"
import { returnedSchemas } from "@arrhes/metadata/schemas"
import * as v from "valibot"


export function AccountSelect(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    value?: string | null
    onChange: (value?: string | null) => void
}) {
    const accountsResponse = useHTTPData({
        routeDefinition: readAllAccountsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
            idYear: props.idYear
        },
    })

    return (
        <InputCombobox
            value={props.value}
            onChange={props.onChange}
            isLoading={accountsResponse.isPending}
            allowEmpty={true}
            placeholder="Sélectionner un compte"
            options={
                (accountsResponse.data === undefined)
                    ? []
                    : accountsResponse.data.map((account) => ({
                        key: account.id,
                        label: `${account.number} ${account.label}`
                    }))
            }
        />
    )
}

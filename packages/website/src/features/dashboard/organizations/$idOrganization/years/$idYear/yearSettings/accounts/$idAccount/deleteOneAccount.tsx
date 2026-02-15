import { deleteOneAccountRouteDefinition, readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../../../../routes/applicationRouter.tsx"
import { invalidateData } from "../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneAccount(props: {
    account: v.InferOutput<typeof returnedSchemas.account>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneAccountRouteDefinition,
            body: {
                idAccount: props.account.id,
                idOrganization: props.account.idOrganization,
                idYear: props.account.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du compte", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllAccountsRouteDefinition,
            body: {
                idOrganization: props.account.idOrganization,
                idYear: props.account.idYear,
            },
        })

        toast({ title: "Compte supprimé", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes",
            params: {
                idOrganization: props.account.idOrganization,
                idYear: props.account.idYear
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer ce compte ?"
            description={<>Cette action supprimera le compte et toutes les données associées.<br />Cette action est irréversible.</>}
            submitText="Supprimer le compte"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

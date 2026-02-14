import { deleteOneOrganizationUserRouteDefinition, readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../utilities/postAPI.ts"


export function DeleteOneOrganizationUser(props: {
    organizationUser: v.InferOutput<typeof returnedSchemas.organizationUser>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneOrganizationUserRouteDefinition,
            body: {
                idOrganizationUser: props.organizationUser.id,
                idOrganization: props.organizationUser.idOrganization,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'utilisateur", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {
                idOrganization: props.organizationUser.idOrganization
            },
        })
        toast({ title: "Utilisateur supprimé de l'organisation", variant: "success" })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer l'utilisateur de cette organisation ?"
            description="Cette action est irréversible."
            submitText="Supprimer l'utilisateur"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

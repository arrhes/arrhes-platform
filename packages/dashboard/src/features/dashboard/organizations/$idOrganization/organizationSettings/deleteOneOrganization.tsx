import { deleteOneOrganizationRouteDefinition, getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../utilities/postAPI.ts"


export function DeleteOneOrganization(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette organisation ?"
            description={
                <>
                    Cette action supprimera l'organisation et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer l'organisation"
            onSubmit={
                async () => {
                    const deleteResponse = await postAPI({
                        routeDefinition: deleteOneOrganizationRouteDefinition,
                        body: {
                            idOrganization: props.idOrganization
                        }
                    })

                    if (deleteResponse.ok === false) {
                        toast({ title: "Erreur lors de la suppression de l'organisation", variant: "error" })
                        return
                    }

                    await invalidateData({
                        routeDefinition: getAllMyOrganizationsRouteDefinition,
                        body: {
                            idOrganization: props.idOrganization
                        },
                    })

                    toast({ title: "Organisation supprimée", variant: "success" })

                    platformRouter.navigate({ to: "/dashboard/organisations" })
                }
            }
        >
            {props.children}
        </DeleteConfirmation >
    )
}

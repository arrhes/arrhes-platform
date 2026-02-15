import { deleteOneComputationRouteDefinition, readAllComputationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../../../../../routes/applicationRouter.tsx"
import { invalidateData } from "../../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneComputation(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneComputationRouteDefinition,
            body: {
                idComputation: props.computation.id,
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de calcul", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllComputationsRouteDefinition,
            body: {
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear,
            },
        })

        toast({ title: "Ligne de calcul supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette ligne de calcul ?"
            description={<>Cette action supprimera la ligne de calcul et toutes les données associées.<br />Cette action est irréversible.</>}
            submitText="Supprimer la ligne de calcul"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

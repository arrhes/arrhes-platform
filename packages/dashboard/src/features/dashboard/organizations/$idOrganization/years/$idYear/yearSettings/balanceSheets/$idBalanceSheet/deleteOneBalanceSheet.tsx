import { deleteOneBalanceSheetRouteDefinition, readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../../utilities/postAPI.ts"


export function DeleteOneBalanceSheet(props: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneBalanceSheetRouteDefinition,
            body: {
                idBalanceSheet: props.balanceSheet.id,
                idOrganization: props.balanceSheet.idOrganization,
                idYear: props.balanceSheet.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de bilan", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllBalanceSheetsRouteDefinition,
            body: {
                idOrganization: props.balanceSheet.idOrganization,
                idYear: props.balanceSheet.idYear,
            },
        })

        toast({ title: "Ligne de bilan supprimée", variant: "success" })

        platformRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/bilan",
            params: {
                idOrganization: props.balanceSheet.idOrganization,
                idYear: props.balanceSheet.idYear
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette ligne de bilan ?"
            description={<>Cette action supprimera la ligne de bilan et toutes les données associées.<br />Cette action est irréversible.</>}
            submitText="Supprimer la ligne de bilan"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

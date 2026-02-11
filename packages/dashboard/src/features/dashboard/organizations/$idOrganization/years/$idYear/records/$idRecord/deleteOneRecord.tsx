import { deleteOneRecordRouteDefinition, readAllRecordsRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ComponentPropsWithRef, ReactElement } from "react"
import * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { platformRouter } from "../../../../../../../../routes/platformRouter.tsx"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"
import { postAPI } from "../../../../../../../../utilities/postAPI.ts"


export function DeleteOneRecord(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    children: ReactElement<ComponentPropsWithRef<'div'>>
}) {
    async function onSubmit() {
        const deleteResponse = await postAPI({
            routeDefinition: deleteOneRecordRouteDefinition,
            body: {
                idRecord: props.record.id,
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear,
            }
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'écriture", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllRecordsRouteDefinition,
            body: {
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear,
            },
        })

        toast({ title: "Écriture supprimée", variant: "success" })

        platformRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures",
            params: {
                idOrganization: props.record.idOrganization,
                idYear: props.record.idYear
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette écriture ?"
            description={<>Cette action supprimera l'écriture et toutes les données associées.<br />Cette action est irréversible.</>}
            submitText="Supprimer l'écriture"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

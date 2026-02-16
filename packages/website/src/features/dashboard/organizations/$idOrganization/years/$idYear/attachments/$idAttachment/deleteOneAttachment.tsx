import {
    deleteOneAttachmentRouteDefinition,
    readAllAttachmentsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function DeleteOneAttachment(props: {
    attachment: v.InferOutput<typeof returnedSchemas.attachment>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneAttachmentRouteDefinition,
            body: {
                idAttachment: props.attachment.id,
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du fichier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllAttachmentsRouteDefinition,
            body: {
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear,
            },
        })

        toast({ title: "Fichier supprimé", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/fichiers",
            params: {
                idOrganization: props.attachment.idOrganization,
                idYear: props.attachment.idYear,
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer ce fichier ?"
            description={
                <>
                    Cette action supprimera le fichier et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer le fichier"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}

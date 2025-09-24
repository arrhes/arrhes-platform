import { readOneAttachmentRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { FormatError } from "components/formats/formatError"
import { CircularLoader } from "components/layouts/circularLoader"
import { ReactElement } from "react"
import { useHTTPData } from "utilities/useHTTPData"
import * as v from "valibot"


export function AttachmentData(props: {
    idAttachment: v.InferOutput<typeof returnedSchemas.attachment>["id"]
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: (data: v.InferOutput<typeof readOneAttachmentRouteDefinition.schemas.return>) => ReactElement | Array<ReactElement> | null
}) {
    const attachmentResponse = useHTTPData({
        routeDefinition: readOneAttachmentRouteDefinition,
        body: {
            idAttachment: props.idAttachment,
            idOrganization: props.idOrganization,
            idYear: props.idYear,
        },
    })

    if (attachmentResponse.data === undefined) {
        if (attachmentResponse.isPending) {
            return (
                <CircularLoader
                    text="Récupération du fichier..."
                />
            )
        }
        return (
            <FormatError
                text="Impossible de récupérer le fichier."
            />
        )
    }

    return (props.children(attachmentResponse.data))
}

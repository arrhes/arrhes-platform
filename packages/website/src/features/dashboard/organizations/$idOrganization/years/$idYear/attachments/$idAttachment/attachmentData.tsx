import { readOneAttachmentRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { CircularLoader } from "@arrhes/ui"
import type { ReactElement } from "react"
import type * as v from "valibot"
import { FormatError } from "../../../../../../../../components/formats/formatError.tsx"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.ts"

export function AttachmentData(props: {
    idAttachment: v.InferOutput<typeof returnedSchemas.attachment>["id"]
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: (
        data: v.InferOutput<typeof readOneAttachmentRouteDefinition.schemas.return>,
    ) => ReactElement | Array<ReactElement> | null
}) {
    const attachmentResponse = useDataFromAPI({
        routeDefinition: readOneAttachmentRouteDefinition,
        body: {
            idAttachment: props.idAttachment,
            idOrganization: props.idOrganization,
            idYear: props.idYear,
        },
    })

    if (attachmentResponse.data === undefined) {
        if (attachmentResponse.isPending) {
            return <CircularLoader text="Récupération du fichier..." />
        }
        return <FormatError text="Impossible de récupérer le fichier." />
    }

    return props.children(attachmentResponse.data)
}

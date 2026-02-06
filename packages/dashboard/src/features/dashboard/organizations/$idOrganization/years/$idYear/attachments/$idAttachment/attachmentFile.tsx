import { generateAttachmentGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import * as v from "valibot"
import { FormatError } from "../../../../../../../../components/formats/formatError.tsx"
import { useDataFromAPI } from "../../../../../../../../utilities/useHTTPData.ts"


export function AttachmentFile(props: {
    attachment: v.InferOutput<typeof returnedSchemas.attachment>
}) {
    const attachmentSignedUrlResponse = useDataFromAPI({
        routeDefinition: generateAttachmentGetSignedUrlRouteDefinition,
        body: {
            idAttachment: props.attachment.id,
            idOrganization: props.attachment.idOrganization,
            idYear: props.attachment.idYear,
        },
    })

    if (attachmentSignedUrlResponse.data === undefined) {
        if (attachmentSignedUrlResponse.isPending) {
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

    return (
        <embed
            title={props.attachment.reference}
            className={css({ w: "full", minH: "fit", h: "768px", maxH: "768px", border: "1px solid", borderColor: "neutral/20", rounded: "md", p: "4" })}
            src={attachmentSignedUrlResponse.data.url}
            type={props.attachment.type ?? undefined}
        />
    )
}
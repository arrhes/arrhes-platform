import { generateAttachmentGetSignedUrlRouteDefinition } from "@arrhes/schemas/routes"
import { returnedSchemas } from "@arrhes/schemas/schemas"
import { FormatError } from "components/formats/formatError"
import { CircularLoader } from "components/layouts/circularLoader"
import { useHTTPData } from "utilities/useHTTPData"
import * as v from "valibot"


export function AttachmentFile(props: {
    attachment: v.InferOutput<typeof returnedSchemas.attachment>
}) {
    const attachmentSignedUrlResponse = useHTTPData({
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
            className="w-full min-h-fit h-[768px] max-h-[768px] border border-neutral/20 rounded-md p-4"
            src={attachmentSignedUrlResponse.data.url}
            type={props.attachment.type ?? undefined}
        />
    )
}
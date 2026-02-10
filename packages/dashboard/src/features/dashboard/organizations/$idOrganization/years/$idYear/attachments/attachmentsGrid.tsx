import { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonContent } from "@arrhes/ui"
import { IconFile, IconFileTypePdf, IconPhoto, IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import * as v from "valibot"
import { FormatDate } from "../../../../../../../components/formats/formatDate.js"
import { FormatFileSize } from "../../../../../../../components/formats/formatFileSize.js"
import { FormatNull } from "../../../../../../../components/formats/formatNull.js"
import { InputDebounced } from "../../../../../../../components/inputs/inputDebounced.js"
import { InputText } from "../../../../../../../components/inputs/inputText.js"
import { platformRouter } from "../../../../../../../routes/platformRouter.js"
import { css, cx } from "../../../../../../../utilities/cn.js"
import { CreateOneAttachment } from "./createOneAttachment.js"


function getFileIcon(type: string | null) {
    if (!type) return <IconFile size={48} />
    if (type.startsWith("image/")) return <IconPhoto size={48} />
    if (type === "application/pdf") return <IconFileTypePdf size={48} />
    return <IconFile size={48} />
}


function getFileIconColor(type: string | null) {
    if (!type) return "neutral/40"
    if (type.startsWith("image/")) return "blue.500"
    if (type === "application/pdf") return "red.500"
    return "neutral/40"
}


export function AttachmentsGrid(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    attachments: Array<v.InferOutput<typeof returnedSchemas.attachment>>
}) {
    const [filter, setFilter] = useState("")

    const filteredAttachments = props.attachments
        .filter((attachment) => {
            if (!filter) return true
            const searchLower = filter.toLowerCase()
            return (
                attachment.reference.toLowerCase().includes(searchLower) ||
                attachment.label?.toLowerCase().includes(searchLower) ||
                attachment.type?.toLowerCase().includes(searchLower)
            )
        })
        .sort((a, b) => b.date.localeCompare(a.date))

    return (
        <div className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "4"
        })}>
            {/* Header with search and add button */}
            <div className={css({
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4"
            })}>
                <InputDebounced
                    value={filter}
                    onChange={(value) => setFilter(value)}
                >
                    <InputText
                        placeholder="Recherche"
                        className={css({ maxWidth: "320px" })}
                    />
                </InputDebounced>
                <CreateOneAttachment
                    idOrganization={props.idOrganization}
                    idYear={props.idYear}
                >
                    <ButtonContent
                        variant="primary"
                        leftIcon={<IconPlus />}
                        text="Ajouter un fichier"
                    />
                </CreateOneAttachment>
            </div>

            {/* Grid of files */}
            {filteredAttachments.length === 0 ? (
                <FormatNull
                    text="Aucun fichier"
                    className={css({ padding: "8", textAlign: "center" })}
                />
            ) : (
                <div className={css({
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "4"
                })}>
                    {filteredAttachments.map((attachment) => (
                        <div
                            key={attachment.id}
                            onClick={() => {
                                platformRouter.navigate({
                                    to: "/dashboard/organisations/$idOrganization/exercices/$idYear/fichiers/$idAttachment",
                                    params: {
                                        idOrganization: props.idOrganization,
                                        idYear: props.idYear,
                                        idAttachment: attachment.id
                                    }
                                })
                            }}
                            className={cx(
                                css({
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "2",
                                    padding: "4",
                                    borderRadius: "lg",
                                    border: "1px solid",
                                    borderColor: "neutral/10",
                                    backgroundColor: "white",
                                    cursor: "pointer",
                                    transition: "all 0.15s",
                                    _hover: {
                                        borderColor: "primary/30",
                                        backgroundColor: "primary/5",
                                        transform: "translateY(-2px)",
                                        boxShadow: "sm"
                                    }
                                })
                            )}
                        >
                            {/* File icon */}
                            <div className={css({
                                width: "80px",
                                height: "80px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "lg",
                                backgroundColor: "neutral/5"
                            })}>
                                <div className={css({ color: getFileIconColor(attachment.type) })}>
                                    {getFileIcon(attachment.type)}
                                </div>
                            </div>

                            {/* File info */}
                            <div className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "1",
                                textAlign: "center"
                            })}>
                                <span className={css({
                                    width: "100%",
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    color: "neutral",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                })}>
                                    {attachment.reference}
                                </span>
                                {attachment.label && (
                                    <span className={css({
                                        width: "100%",
                                        fontSize: "xs",
                                        color: "neutral/60",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    })}>
                                        {attachment.label}
                                    </span>
                                )}
                                <div className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2",
                                    fontSize: "xs",
                                    color: "neutral/40"
                                })}>
                                    <FormatDate date={attachment.date} />
                                    {attachment.size && (
                                        <>
                                            <span>-</span>
                                            <FormatFileSize size={attachment.size} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

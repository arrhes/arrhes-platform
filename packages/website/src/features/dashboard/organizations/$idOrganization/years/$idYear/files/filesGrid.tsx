import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonContent } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconFile, IconFileTypePdf, IconPhoto, IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { FormatDate } from "../../../../../../../components/formats/formatDate.js"
import { FormatFileSize } from "../../../../../../../components/formats/formatFileSize.js"
import { InputDebounced } from "../../../../../../../components/inputs/inputDebounced.js"
import { InputText } from "../../../../../../../components/inputs/inputText.js"
import { Box } from "../../../../../../../components/layouts/box.js"
import { EmptyState } from "../../../../../../../components/layouts/emptyState.js"
import { applicationRouter } from "../../../../../../../routes/applicationRouter.js"
import { CreateOneFile } from "./createOneFile.js"

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

export function FilesGrid(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    files: Array<v.InferOutput<typeof returnedSchemas.file>>
}) {
    const [filter, setFilter] = useState("")

    const filteredFiles = props.files
        .filter((file) => {
            if (!filter) return true
            const searchLower = filter.toLowerCase()
            return (
                file.reference?.toLowerCase().includes(searchLower) ||
                file.name?.toLowerCase().includes(searchLower) ||
                file.type?.toLowerCase().includes(searchLower)
            )
        })
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4",
            })}
        >
            {/* Header with search and add button */}
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "4",
                })}
            >
                <InputDebounced value={filter} onChange={(value) => setFilter(value)}>
                    <InputText placeholder="Recherche" className={css({ maxWidth: "320px" })} />
                </InputDebounced>
                <CreateOneFile idOrganization={props.idOrganization} idYear={props.idYear}>
                    <ButtonContent variant="primary" leftIcon={<IconPlus />} text="Ajouter un fichier" />
                </CreateOneFile>
            </div>

            <Box>
                {/* Grid of files */}
                {filteredFiles.length === 0 ? (
                    <EmptyState
                        icon={<IconFile size={48} />}
                        title={filter ? "Aucun fichier trouvé" : "Aucun fichier"}
                        subtitle={filter ? undefined : "Ajoutez un fichier pour commencer"}
                    />
                ) : (
                    <div
                        className={css({
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: "4",
                        })}
                    >
                        {filteredFiles.map((file) => (
                            <div
                                key={file.id}
                                onClick={() => {
                                    applicationRouter.navigate({
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/fichiers/$idFile",
                                        params: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear,
                                            idFile: file.id,
                                        },
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
                                            boxShadow: "sm",
                                        },
                                    }),
                                )}
                            >
                                {/* File icon */}
                                <div
                                    className={css({
                                        width: "80px",
                                        height: "80px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "lg",
                                        backgroundColor: "neutral/5",
                                    })}
                                >
                                    <div className={css({ color: getFileIconColor(file.type) })}>
                                        {getFileIcon(file.type)}
                                    </div>
                                </div>

                                {/* File info */}
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "1",
                                        textAlign: "center",
                                    })}
                                >
                                    <span
                                        className={css({
                                            width: "100%",
                                            fontSize: "sm",
                                            fontWeight: "medium",
                                            color: "neutral",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        })}
                                    >
                                        {file.reference}
                                    </span>
                                    {file.name && (
                                        <span
                                            className={css({
                                                width: "100%",
                                                fontSize: "xs",
                                                color: "neutral/60",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            })}
                                        >
                                            {file.name}
                                        </span>
                                    )}
                                    <div
                                        className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "2",
                                            fontSize: "xs",
                                            color: "neutral/40",
                                        })}
                                    >
                                        <FormatDate date={file.createdAt} />
                                        {file.size && (
                                            <>
                                                <span>-</span>
                                                <FormatFileSize size={file.size} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Box>
        </div>
    )
}

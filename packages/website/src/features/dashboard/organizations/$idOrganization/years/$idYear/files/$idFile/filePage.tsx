import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatFileSize } from "../../../../../../../../components/formats/formatFileSize.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../components/linkButton.tsx"
import { fileLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { DeleteOneFile } from "./deleteOneFile.tsx"
import { FileData } from "./fileData.tsx"
import { FileFile } from "./fileFile.tsx"
import { UpdateOneFile } from "./updateOneFile.tsx"

export function FilePage() {
    const params = useParams({ from: fileLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <FileData idOrganization={params.idOrganization} idYear={params.idYear} idFile={params.idFile}>
                    {(file) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div
                                        className={css({
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "2",
                                        })}
                                    >
                                        <LinkButton
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/fichiers"
                                            params={{
                                                idOrganization: file.idOrganization,
                                                idYear: file.idYear,
                                            }}
                                        >
                                            <ButtonContent
                                                variant="default"
                                                leftIcon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </LinkButton>
                                    </div>
                                    <div
                                        className={css({
                                            ml: "auto",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            gap: "2",
                                        })}
                                    >
                                        <UpdateOneFile file={file}>
                                            <ButtonContent
                                                variant="primary"
                                                leftIcon={<IconPencil />}
                                                text="Modifier"
                                            />
                                        </UpdateOneFile>
                                        <DeleteOneFile file={file}>
                                            <ButtonContent variant="default" leftIcon={<IconTrash />} color="error" />
                                        </DeleteOneFile>
                                    </div>
                                </Section.Item>
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Informations" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Référence">
                                                <FormatText>{file.reference}</FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>{file.label}</FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Date">
                                                <FormatDate date={file.date} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Type">
                                                <FormatText>{file.type?.split("/").at(1)}</FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Size">
                                                <FormatFileSize size={file.size} />
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                    <FileFile file={file} />
                                </Section.Item>
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Métadonnées" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={file.createdAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Ajouté par">
												{(file.createdBy===null)
												 ? <FormatNull /> 
												 : <FormatUserWithFetch idUser={file.createdBy} />}
											</DataBlock.Item> */}
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={file.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Modifié par">
												{(file.lastUpdatedBy ===null)
												? <FormatNull /> 
												: <FormatUserWithFetch idUser={file.lastUpdatedBy} />}
											</DataBlock.Item> */}
                                            <DataBlock.Item label="Id">
                                                <FormatText>{file.id}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            </Section.Root>
                        )
                    }}
                </FileData>
            </Page.Content>
        </Page.Root>
    )
}

import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Button, ButtonContent } from "@arrhes/ui"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatFileSize } from "../../../../../../../../components/formats/formatFileSize.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../components/layouts/title.tsx"
import { attachmentLayoutRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute.tsx"
import { AttachmentData } from "./attachmentData.tsx"
import { AttachmentFile } from "./attachmentFile.tsx"
import { DeleteOneAttachment } from "./deleteOneAttachment.tsx"
import { UpdateOneAttachment } from "./updateOneAttachment.tsx"


export function AttachmentPage() {
    const params = useParams({ from: attachmentLayoutRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <AttachmentData
                    idOrganization={params.idOrganization}
                    idYear={params.idYear}
                    idAttachment={params.idAttachment}
                >
                    {(attachment) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                        <Link
                                            to="/organisations/$idOrganization/exercices/$idYear/fichiers"
                                            params={{
                                                idOrganization: attachment.idOrganization,
                                                idYear: attachment.idYear,
                                            }}
                                        >
                                            <ButtonContent
                                                variant="default"
                                                icon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </Link>
                                    </div>
                                    <div className={css({ ml: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                                        <UpdateOneAttachment
                                            attachment={attachment}
                                        >
                                            <Button
                                                variant="primary"
                                                icon={<IconPencil />}
                                                text="Modifier"
                                            />
                                        </UpdateOneAttachment>
                                        <DeleteOneAttachment
                                            attachment={attachment}
                                        >
                                            <Button
                                                variant="default"
                                                icon={<IconTrash />}
                                                title="Supprimer"
                                                color="error"
                                            />
                                        </DeleteOneAttachment>
                                    </div>
                                </Section.Item>
                                <Section.Item className={css({ flexDir: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header>
                                            <TitleComponent>
                                                Informations
                                            </TitleComponent>
                                        </DataBlock.Header>
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Référence">
                                                <FormatText>
                                                    {attachment.reference}
                                                </FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>
                                                    {attachment.label}
                                                </FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Date">
                                                <FormatDate date={attachment.date} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Type">
                                                <FormatText>
                                                    {attachment.type?.split("/").at(1)}
                                                </FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Size">
                                                <FormatFileSize size={attachment.size} />
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                    <AttachmentFile
                                        attachment={attachment}
                                    />
                                </Section.Item>
                                <Section.Item className={css({ flexDir: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header>
                                            <TitleComponent>
                                                Métadonnées
                                            </TitleComponent>
                                        </DataBlock.Header>
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={attachment.createdAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Ajouté par">
                                                {(attachment.createdBy===null)
                                                 ? <FormatNull /> 
                                                 : <FormatUserWithFetch idUser={attachment.createdBy} />}
                                            </DataBlock.Item> */}
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={attachment.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Modifié par">
                                                {(attachment.lastUpdatedBy ===null)
                                                ? <FormatNull /> 
                                                : <FormatUserWithFetch idUser={attachment.lastUpdatedBy} />}
                                            </DataBlock.Item> */}
                                            <DataBlock.Item label="Id">
                                                <FormatText>
                                                    {attachment.id}
                                                </FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            </Section.Root>
                        )
                    }}
                </AttachmentData>
            </Page.Content>
        </Page.Root>
    )
}
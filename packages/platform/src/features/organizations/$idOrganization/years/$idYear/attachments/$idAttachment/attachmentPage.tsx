import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { ButtonOutline } from "components/buttons/buttonOutline"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { FormatDate } from "components/formats/formatDate"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatFileSize } from "components/formats/formatFileSize"
import { FormatText } from "components/formats/formatText"
import { DataBlock } from "components/layouts/dataBlock/dataBlock"
import { Page } from "components/layouts/page/page"
import { Section } from "components/layouts/section/section"
import { TitleComponent } from "components/layouts/title"
import { AttachmentData } from "features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentData"
import { AttachmentFile } from "features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentFile"
import { DeleteOneAttachment } from "features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/deleteOneAttachment"
import { UpdateOneAttachment } from "features/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/updateOneAttachment"
import { attachmentLayoutRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute"


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
                                    <div className="flex justify-start items-center gap-2">
                                        <Link
                                            to="/organisations/$idOrganization/exercices/$idYear/fichiers"
                                            params={{
                                                idOrganization: attachment.idOrganization,
                                                idYear: attachment.idYear,
                                            }}
                                        >
                                            <ButtonOutlineContent
                                                icon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </Link>
                                    </div>
                                    <div className="ml-auto flex justify-end items-center gap-2">
                                        <UpdateOneAttachment
                                            attachment={attachment}
                                        >
                                            <ButtonPlain
                                                icon={<IconPencil />}
                                                text="Modifier"
                                            />
                                        </UpdateOneAttachment>
                                        <DeleteOneAttachment
                                            attachment={attachment}
                                        >
                                            <ButtonOutline
                                                icon={<IconTrash />}
                                                title="Supprimer"
                                                color="error"
                                            />
                                        </DeleteOneAttachment>
                                    </div>
                                </Section.Item>
                                <Section.Item className="flex-col">
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
                                <Section.Item className="flex-col">
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
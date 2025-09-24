import { readOneAccountRouteDefinition, readOneRecordRowRouteDefinition } from "@arrhes/schemas/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { ButtonOutline } from "components/buttons/buttonOutline"
import { ButtonOutlineContent } from "components/buttons/buttonOutlineContent"
import { ButtonPlain } from "components/buttons/buttonPlain"
import { FormatDateTime } from "components/formats/formatDateTime"
import { FormatNull } from "components/formats/formatNull"
import { FormatPrice } from "components/formats/formatPrice"
import { FormatText } from "components/formats/formatText"
import { DataBlock } from "components/layouts/dataBlock/dataBlock"
import { DataWrapper } from "components/layouts/dataWrapper"
import { Page } from "components/layouts/page/page"
import { Section } from "components/layouts/section/section"
import { TitleComponent } from "components/layouts/title"
import { DeleteOneRecordRow } from "features/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/deleteOneRecordRow"
import { UpdateOneRecordRow } from "features/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/updateOneRecordRow"
import { recordRowRoute } from "routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowRoute"


export function RecordRowPage() {
    const params = useParams({ from: recordRowRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneRecordRowRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                        idYear: params.idYear,
                        idRecordRow: params.idRecordRow,
                    }}
                >
                    {(recordRow) => {
                        return (
                            <Section.Root>
                                <Section.Item>
                                    <div className="w-full flex justify-between items-start gap-2">
                                        <Link
                                            to="/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord"
                                            params={{
                                                idOrganization: recordRow.idOrganization,
                                                idYear: recordRow.idYear,
                                                idRecord: recordRow.idRecord,
                                            }}
                                        >
                                            <ButtonOutlineContent
                                                icon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </Link>
                                        <div className="flex justify-end items-center gap-2">
                                            <UpdateOneRecordRow
                                                recordRow={recordRow}
                                            >
                                                <ButtonPlain
                                                    icon={<IconPencil />}
                                                    text="Modifier"
                                                />
                                            </UpdateOneRecordRow>
                                            <DeleteOneRecordRow
                                                recordRow={recordRow}
                                            >
                                                <ButtonOutline
                                                    icon={<IconTrash />}
                                                    title="Supprimer"
                                                    color="error"
                                                />
                                            </DeleteOneRecordRow>
                                        </div>
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
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>
                                                    {recordRow.label}
                                                </FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Compte">
                                                {(recordRow.idAccount === null)
                                                    ? (<FormatNull />)
                                                    : (
                                                        <DataWrapper
                                                            routeDefinition={readOneAccountRouteDefinition}
                                                            body={{
                                                                idOrganization: params.idOrganization,
                                                                idYear: params.idYear,
                                                                idAccount: recordRow.idAccount,
                                                            }}
                                                        >
                                                            {(account) => (
                                                                <span>
                                                                    {`${account.number} - ${account.label}`}
                                                                </span>
                                                            )}
                                                        </DataWrapper>
                                                    )
                                                }
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Débit">
                                                <FormatPrice price={recordRow.debit} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Crédit">
                                                <FormatPrice price={recordRow.credit} />
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                    <DataBlock.Root>
                                        <DataBlock.Header>
                                            <TitleComponent>
                                                Métadonnées
                                            </TitleComponent>
                                        </DataBlock.Header>
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={recordRow.createdAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={recordRow.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Id">
                                                <FormatText>
                                                    {recordRow.id}
                                                </FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            </Section.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
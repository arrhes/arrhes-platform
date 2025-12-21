import { ButtonOutline } from "#/components/buttons/buttonOutline.js"
import { ButtonOutlineContent } from "#/components/buttons/buttonOutlineContent.js"
import { ButtonPlain } from "#/components/buttons/buttonPlain.js"
import { FormatBoolean } from "#/components/formats/formatBoolean.js"
import { FormatDateTime } from "#/components/formats/formatDateTime.js"
import { FormatText } from "#/components/formats/formatText.js"
import { DataBlock } from "#/components/layouts/dataBlock/dataBlock.js"
import { DataWrapper } from "#/components/layouts/dataWrapper.js"
import { Section } from "#/components/layouts/section/section.js"
import { TitleComponent } from "#/components/layouts/title.js"
import { DeleteOneAccount } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/deleteOneAccount.js"
import { UpdateOneAccount } from "#/features/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/updateOneAccount.js"
import { accountRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.js"
import { readOneAccountRouteDefinition } from "@arrhes/metadata/routes"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"


export function AccountPage() {
    const params = useParams({ from: accountRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneAccountRouteDefinition}
                body={{
                    idOrganization: params.idOrganization,
                    idYear: params.idYear,
                    idAccount: params.idAccount,
                }}
            >
                {(account) => {
                    return (
                        <Fragment>
                            <Section.Item className="flex-row">
                                <div className="flex justify-start items-center gap-2">
                                    <Link
                                        to="/organisations/$idOrganization/exercices/$idYear/paramètres/comptes"
                                        params={{
                                            idOrganization: account.idOrganization,
                                            idYear: account.idYear,
                                        }}
                                    >
                                        <ButtonOutlineContent
                                            icon={<IconChevronLeft />}
                                            text="Retour"
                                        />
                                    </Link>
                                </div>
                                <div className="ml-auto flex justify-end items-center gap-2">
                                    <UpdateOneAccount
                                        account={account}
                                    >
                                        <ButtonPlain
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneAccount>
                                    <DeleteOneAccount
                                        account={account}
                                    >
                                        <ButtonOutline
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneAccount>
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
                                        <DataBlock.Item label="Numéro">
                                            <FormatText>
                                                {account.number.toString()}
                                            </FormatText>
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Libellé">
                                            <FormatText>
                                                {account.label}
                                            </FormatText>
                                        </DataBlock.Item>
                                        {/* <DataBlock.Item label="Système">
                        <FormatBoolean boolean={account.data.isMandatory} text={account.data.isMandatory ? "Minimal" : "Facultatif"} />
                    </DataBlock.Item> */}
                                        <DataBlock.Item label="Classe/sous-classe ?">
                                            <FormatBoolean boolean={account.isClass} />
                                        </DataBlock.Item>
                                        <DataBlock.Item label="Sélectionnable ?">
                                            <FormatBoolean boolean={account.isSelectable} />
                                        </DataBlock.Item>
                                        {/* <DataBlock.Item label="Type de compte">
                                                <FormatSelect option={account.type} options={accountTypeOptions} />
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Compte parent">
                                                {!account.idAccountParent
                                                    ? <FormatNull />
                                                    : <FormatAccountWithFetch idAccount={account.data.idParent} />
                                                }
                                            </DataBlock.Item> */}
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                            <Section.Item>
                                <DataBlock.Root>
                                    <DataBlock.Header>
                                        <TitleComponent>
                                            Métadonnées
                                        </TitleComponent>
                                    </DataBlock.Header>
                                    <DataBlock.Content>
                                        <DataBlock.Item label="Ajouté le">
                                            <FormatDateTime date={account.createdAt} />
                                        </DataBlock.Item>
                                        {/* <DataBlock.Item label="Ajouté par">
                                                {!account.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={account.data.createdBy} />}
                                            </DataBlock.Item> */}
                                        <DataBlock.Item label="Modifié le">
                                            <FormatDateTime date={account.lastUpdatedAt} />
                                        </DataBlock.Item>
                                        {/* <DataBlock.Item label="Modifié par">
                                                {!account.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={account.data.lastUpdatedBy} />}
                                            </DataBlock.Item> */}
                                        <DataBlock.Item label="Id">
                                            <FormatText>
                                                {account.id}
                                            </FormatText>
                                        </DataBlock.Item>
                                    </DataBlock.Content>
                                </DataBlock.Root>
                            </Section.Item>
                        </Fragment>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
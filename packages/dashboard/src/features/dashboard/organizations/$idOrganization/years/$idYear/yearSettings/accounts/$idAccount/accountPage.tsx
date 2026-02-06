import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { FormatBoolean } from "../../../../../../../../../components/formats/formatBoolean.tsx"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { TitleComponent } from "../../../../../../../../../components/layouts/title.tsx"
import { accountRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.tsx"
import { DeleteOneAccount } from "./deleteOneAccount.tsx"
import { UpdateOneAccount } from "./updateOneAccount.tsx"


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
                            <Section.Item className={css({ flexDir: "row" })}>
                                <div className={css({ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "2" })}>
                                    <Link
                                        to="/organisations/$idOrganization/exercices/$idYear/paramètres/comptes"
                                        params={{
                                            idOrganization: account.idOrganization,
                                            idYear: account.idYear,
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
                                    <UpdateOneAccount
                                        account={account}
                                    >
                                        <Button
                                            variant="primary"
                                            icon={<IconPencil />}
                                            text="Modifier"
                                        />
                                    </UpdateOneAccount>
                                    <DeleteOneAccount
                                        account={account}
                                    >
                                        <Button
                                            variant="default"
                                            icon={<IconTrash />}
                                            title="Supprimer"
                                            color="error"
                                        />
                                    </DeleteOneAccount>
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
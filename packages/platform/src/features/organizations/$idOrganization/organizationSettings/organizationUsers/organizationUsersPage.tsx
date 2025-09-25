import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { Section } from "#/components/layouts/section/section.js"
import { CreateOneOrganizationUser } from "#/features/organizations/$idOrganization/organizationSettings/organizationUsers/createOneOrganizationUser.js"
import { OrganizationUsersTable } from "#/features/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersTable.js"
import { organizationUsersRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersRoute.js"
import { IconUserPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"


export function OrganizationUsersPage() {
    const params = useParams({ from: organizationUsersRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className="w-full flex justify-end items-center gap-2">
                    <CreateOneOrganizationUser
                        idOrganization={params.idOrganization}
                    >
                        <ButtonPlainContent
                            icon={<IconUserPlus />}
                            text="Ajouter un utilisateur"
                        />
                    </CreateOneOrganizationUser>
                </div>
                <OrganizationUsersTable
                    idOrganization={params.idOrganization}
                />
            </Section.Item>
        </Section.Root>
    )
}

import { IconUserPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { ButtonPlainContent } from "components/buttons/buttonPlainContent"
import { Section } from "components/layouts/section/section"
import { CreateOneOrganizationUser } from "features/organizations/$idOrganization/organizationSettings/organizationUsers/createOneOrganizationUser"
import { OrganizationUsersTable } from "features/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersTable"
import { organizationUsersRoute } from "routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersRoute"


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

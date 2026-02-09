import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconUserPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { organizationUsersRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersRoute.tsx"
import { CreateOneOrganizationUser } from "./createOneOrganizationUser.tsx"
import { OrganizationUsersTable } from "./organizationUsersTable.tsx"


export function OrganizationUsersPage() {
    const params = useParams({ from: organizationUsersRoute.id })

    return (
        <Section.Root>
            <Section.Item>
                <div className={css({ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2" })}>
                    <CreateOneOrganizationUser
                        idOrganization={params.idOrganization}
                    >
                        <ButtonContent
                            variant="primary"
                            leftIcon={<IconUserPlus />}
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

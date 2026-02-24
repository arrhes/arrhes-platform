import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { organizationApiKeysKeysRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationApiKeys/organizationApiKeysKeysRoute.tsx"
import { ApiKeysListTable } from "./apiKeysListTable.tsx"
import { CreateOneApiKey } from "./createOneApiKey.tsx"

export function OrganizationApiKeysKeysPage() {
    const params = useParams({ from: organizationApiKeysKeysRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <div className={css({ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" })}>
                    <CreateOneApiKey idOrganization={params.idOrganization}>
                        <ButtonOutlineContent leftIcon={<IconPlus />} text="Créer une clé API" />
                    </CreateOneApiKey>
                </div>
                <ApiKeysListTable idOrganization={params.idOrganization} />
            </Page.Content>
        </Page.Root>
    )
}

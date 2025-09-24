import { Page } from "components/layouts/page/page"
import { DocumentationBanner } from "features/home/documentationBanner"
import { OrganizationsBanner } from "features/home/organizationsBanner"


export function HomePage() {
    return (
        <Page.Root>
            <Page.Content>
                <OrganizationsBanner />
                <DocumentationBanner />
            </Page.Content>
        </Page.Root>
    )
}
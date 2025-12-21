import { Page } from "#/components/layouts/page/page.js"
import { DocumentationBanner } from "#/features/home/documentationBanner.js"
import { OrganizationsBanner } from "#/features/home/organizationsBanner.js"


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
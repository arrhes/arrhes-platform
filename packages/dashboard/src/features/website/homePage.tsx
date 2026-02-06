import { Page } from "../../components/layouts/page/page.js"
import { DocumentationBanner } from "./documentationBanner.js"
import { OrganizationsBanner } from "./organizationsBanner.js"


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
import { ButtonPlainContent } from "#/components/buttons/buttonPlainContent.js"
import { Box } from "#/components/layouts/box.js"
import { IconExternalLink } from "@tabler/icons-react"


export function DocumentationBanner() {
    return (
        <Box className="p-8 gap-4">
            <div className="flex flex-col justify-start items-start">
                <h2 className="text-2xl">Documentation</h2>
                <p className="text-neutral/50">Collaborative et ouverte</p>
            </div>
            <a
                href="https://documentation.arrhes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit"
                aria-label="Adresse de la documentation"
            >
                <ButtonPlainContent
                    icon={<IconExternalLink />}
                    text="Consulter la documentation"
                />
            </a>
        </Box>
    )
}

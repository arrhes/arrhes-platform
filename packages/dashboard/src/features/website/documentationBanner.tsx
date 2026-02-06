import { ButtonContent } from "@arrhes/ui"
import { Box } from "../../components/layouts/box.js"
import { css } from "../../utilities/cn.js"
import { IconExternalLink } from "@tabler/icons-react"


export function DocumentationBanner() {
    return (
        <Box className={css({ p: "8", gap: "4" })}>
            <div className={css({ display: "flex", flexDir: "column", justifyContent: "flex-start", alignItems: "flex-start" })}>
                <h2 className={css({ fontSize: "2xl" })}>Documentation</h2>
                <p className={css({ color: "neutral/50" })}>Collaborative et ouverte</p>
            </div>
            <a
                href="https://documentation.arrhes.com"
                target="_blank"
                rel="noopener noreferrer"
                className={css({ w: "fit-content" })}
                aria-label="Adresse de la documentation"
            >
                <ButtonContent
                    variant="primary"
                    icon={<IconExternalLink />}
                    text="Consulter la documentation"
                />
            </a>
        </Box>
    )
}

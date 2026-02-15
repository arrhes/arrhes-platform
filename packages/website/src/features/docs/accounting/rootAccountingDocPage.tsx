import { ButtonContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"


export function RootAccountingDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            })}>
                <h1 className={css({
                    fontSize: "lg",
                    fontWeight: "bold",
                    color: "neutral",
                })}>
                    Comptabilité
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Apprenez les bases de la comptabilité française.
                </p>
            </div>

            <LinkButton
                to="/documentation/comptabilité/comptes"
            >
                <ButtonContent
                    variant="outline"
                    text="Commencer directement"
                    rightIcon={<IconChevronRight />}
                />
            </LinkButton>
        </DocRoot>
    )
}

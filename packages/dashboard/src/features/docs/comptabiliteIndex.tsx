import { ButtonContent } from "@arrhes/ui"
import { IconChevronRight } from "@tabler/icons-react"
import { LinkButton } from "../../components/linkButton.js"
import { css } from "../../utilities/cn.js"


export function ComptabiliteIndex() {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        })}>
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
                    Apprenez les bases de la comptabilité française et découvrez comment utiliser
                    Arrhes pour gérer votre comptabilité au quotidien.
                </p>
            </div>

            {/* Main sections */}
            <div className={css({
                display: "flex",
                flexDirection: { base: "column", md: "row" },
                gap: "1.5rem",
            })}>
                <LinkButton
                    to="/documentation/comptabilite/comptes"
                >
                    <ButtonContent
                        variant="outline"
                        text="Commencer directement"
                        rightIcon={<IconChevronRight />}
                    />
                </LinkButton>
            </div>
        </div>
    )
}

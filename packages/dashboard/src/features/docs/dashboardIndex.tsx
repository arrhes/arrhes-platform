import { ButtonContent } from "@arrhes/ui"
import { IconChevronRight, IconRocket } from "@tabler/icons-react"
import { DocLink } from "../../components/document/docLink.js"
import { DocTip } from "../../components/document/docTip.js"
import { LinkButton } from "../../components/linkButton.js"
import { css } from "../../utilities/cn.js"


export function DashboardIndex() {
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
                    Guide d'utilisation
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Découvrez comment utiliser Arrhes au quotidien pour gérer votre comptabilité
                    de manière simple et efficace.
                </p>
            </div>


            <div className={css({
                padding: "1.5rem",
                borderRadius: "lg",
                backgroundColor: "primary/5",
                border: "1px solid",
                borderColor: "primary/20",
                display: "flex",
                flexDirection: { base: "column", md: "row" },
                alignItems: { base: "flex-start", md: "center" },
                gap: "1rem",
            })}>
                <div className={css({
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "md",
                    backgroundColor: "primary/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary",
                    flexShrink: 0,
                    "& svg": {
                        width: "1.5rem",
                        height: "1.5rem"
                    }
                })}>
                    <IconRocket />
                </div>
                <div className={css({ flex: "1" })}>
                    <h2 className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                        mb: "0.25rem"
                    })}>
                        Nouveau sur Arrhes ?
                    </h2>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                    })}>
                        Commencez par le guide de démarrage pour configurer votre première organisation
                        et comprendre les bases du logiciel.
                    </p>
                </div>
                <LinkButton
                    to="/documentation/dashboard/demarrage"
                >
                    <ButtonContent
                        variant="primary"
                        text="Commencer"
                        rightIcon={<IconChevronRight />}
                    />
                </LinkButton>
            </div>

            <DocTip variant="info">
                <span>
                    Vous avez trouvé un bug ? Vous souhaitez ajouter une fonctionnalité ?{" "}
                    <a
                        className={css({ color: "primary", fontWeight: "semibold", _hover: { textDecoration: "underline" } })}
                        href="https://github.com/arrhes/arrhes-platform/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ouvrez un ticket sur GitHub
                    </a>
                    {" "}pour que nous puissions discuter de ça rapidement.
                </span>
            </DocTip>

            {/* Tip box */}
            <DocTip variant="tip">
                Si vous n'avez jamais fait de comptabilité, nous vous recommandons de commencer par le{" "}
                <DocLink to="/documentation/comptabilite">cours de comptabilité</DocLink>
                {" "}avant de consulter le guide d'utilisation. Cela vous permettra de mieux comprendre
                les concepts utilisés dans le logiciel.
            </DocTip>
        </div>
    )
}

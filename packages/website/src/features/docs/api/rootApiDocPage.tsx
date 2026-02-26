import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function RootApiDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <h1
                    className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}
                >
                    API REST
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Documentation technique de l'API REST d'Arrhes. Toutes les routes, leurs paramètres et leurs
                    réponses.
                </p>
            </div>

            {/* About section */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <h2
                    className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    Vue d'ensemble
                </h2>
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    L'API d'Arrhes suit un modèle de routage basé sur le corps de la requête : toutes les routes
                    utilisent la méthode POST, et les identifiants sont passés dans le corps JSON. L'API expose 112
                    routes réparties en 23 catégories.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/api/introduction">
                        <ButtonOutlineContent text="Commencer" rightIcon={<IconChevronRight />} />
                    </LinkButton>
                </div>
            </div>

            <DocTip variant="info">
                L'API utilise une authentification par cookies de session. Les routes publiques (authentification,
                webhooks) ne nécessitent pas de session. Les routes protégées nécessitent le cookie{" "}
                <code>arrhes_id_user_session</code> obtenu lors de la connexion.
            </DocTip>

            <DocTip variant="tip">
                Pour comprendre les concepts métier utilisés dans l'API, consultez le{" "}
                <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink> et le{" "}
                <DocLink to="/documentation/dashboard">guide d'utilisation</DocLink>.
            </DocTip>
        </DocRoot>
    )
}

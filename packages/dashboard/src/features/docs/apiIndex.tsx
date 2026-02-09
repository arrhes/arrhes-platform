import { Badge } from "@arrhes/ui"
import { IconCode, IconSettings } from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"


export function ApiIndex() {
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
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                })}>
                    <h1 className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}>
                        API REST
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    L'API REST d'Arrhes vous permettra d'intégrer vos outils et d'automatiser
                    vos processus comptables.
                </p>
            </div>

            {/* Under development notice */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                padding: "3rem 2rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                textAlign: "center",
            })}>
                <div className={css({
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "lg",
                    backgroundColor: "warning/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "warning",
                    "& svg": {
                        width: "2rem",
                        height: "2rem"
                    }
                })}>
                    <IconSettings />
                </div>
                <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}>
                    <h2 className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}>
                        API en cours de développement
                    </h2>
                    <p className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                        maxWidth: "28rem",
                    })}>
                        Nous travaillons activement sur l'API REST d'Arrhes. Elle vous permettra
                        de créer des intégrations personnalisées, d'automatiser vos écritures comptables
                        et de connecter Arrhes à vos autres outils.
                    </p>
                </div>
            </div>

            {/* What to expect */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1.5rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
            })}>
                <h2 className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "neutral",
                })}>
                    Fonctionnalités prévues
                </h2>
                <ul className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    margin: 0,
                    paddingLeft: "1.5rem",
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "relaxed",
                    "& li": {
                        marginBottom: "0.25rem"
                    }
                })}>
                    <li>Gestion des organisations et des exercices comptables</li>
                    <li>Création et modification d'écritures comptables</li>
                    <li>Consultation du plan comptable et des soldes</li>
                    <li>Génération de documents (FEC, grand livre, balance...)</li>
                    <li>Authentification par token API</li>
                    <li>Webhooks pour les événements importants</li>
                </ul>
            </div>

            {/* Preview code */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1.5rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
            })}>
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                })}>
                    <IconCode className={css({ width: "1.25rem", height: "1.25rem", color: "neutral/50" })} />
                    <h2 className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}>
                        Aperçu
                    </h2>
                </div>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}>
                    Voici à quoi ressemblera une requête vers l'API :
                </p>
                <div className={css({
                    padding: "1rem",
                    borderRadius: "md",
                    backgroundColor: "neutral/5",
                    fontFamily: "mono",
                    fontSize: "sm",
                    color: "neutral",
                    overflowX: "auto",
                })}>
                    <code>
                        curl -X GET https://api.arrhes.fr/v1/organisations \<br />
                        {"  "}-H "Authorization: Bearer YOUR_API_TOKEN"
                    </code>
                </div>
            </div>

            {/* Stay informed */}
            <div className={css({
                padding: "1.5rem",
                borderRadius: "lg",
                backgroundColor: "information/8",
                border: "1px solid",
                borderColor: "information/20"
            })}>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/80",
                    lineHeight: "relaxed",
                    margin: 0
                })}>
                    <span className={css({ fontWeight: "semibold", color: "neutral" })}>Restez informé : </span>
                    Cette documentation sera mise à jour au fur et à mesure du développement de l'API.
                    Revenez régulièrement pour découvrir les nouvelles fonctionnalités disponibles.
                </p>
            </div>
        </div>
    )
}

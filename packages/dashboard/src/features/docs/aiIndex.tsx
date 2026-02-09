import { Badge } from "@arrhes/ui"
import { IconChartBar, IconMessageCircle } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { DocLinkCard } from "../../components/document/docLinkCard.js"
import { css } from "../../utilities/cn.js"


export function AiIndex() {
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
                        Intelligence Artificielle
                    </h1>
                    <Badge>Pro</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    L'assistant IA d'Arrhes vous assiste dans la gestion quotidienne de votre comptabilité.
                    Disponibles avec le plan Pro.
                </p>
            </div>

            {/* Features */}
            <div className={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                gap: "1rem",
            })}>
                <DocLinkCard
                    icon={<IconMessageCircle />}
                    iconColor="primary"
                    title="Assistant comptable"
                    description="Posez vos questions et obtenez des réponses adaptées à votre contexte comptable."
                    to="/documentation/ai/assistant"
                />
                <DocLinkCard
                    icon={<IconChartBar />}
                    iconColor="primary"
                    title="Analyse des données"
                    description="Obtenez des insights et des recommandations basées sur vos données financières."
                    to="/documentation/ai/analyse"
                />
            </div>

            {/* How it works */}
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
                    Comment ça fonctionne ?
                </h2>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}>
                    L'assistant' IA d'Arrhes utilise des modèles de langage avancés pour comprendre
                    vos questions et analyser vos données comptables. Ils sont entraînés sur les normes
                    comptables françaises et s'adaptent au contexte de votre organisation.
                </p>
                <ul className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    paddingLeft: "1rem",
                })}>
                    <li className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        listStyleType: "disc",
                    })}>
                        Vos données restent privées et ne sont jamais utilisées pour l'entraînement
                    </li>
                    <li className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        listStyleType: "disc",
                    })}>
                        Les réponses sont contextualisées à votre organisation
                    </li>
                    <li className={css({
                        fontSize: "sm",
                        color: "neutral/70",
                        listStyleType: "disc",
                    })}>
                        L'IA peut suggérer des écritures mais ne les crée jamais automatiquement
                    </li>
                </ul>
            </div>

            {/* Pro plan note */}
            <div className={css({
                padding: "1.5rem",
                borderRadius: "lg",
                backgroundColor: "primary/5",
                border: "1px solid",
                borderColor: "primary/20"
            })}>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/80",
                    lineHeight: "relaxed"
                })}>
                    <span className={css({ fontWeight: "semibold", color: "neutral" })}>Plan Pro requis : </span>
                    Les fonctionnalités d'intelligence artificielle sont disponibles exclusivement
                    avec le plan Pro. {" "}
                    <Link to="/documentation/tarifs" className={css({
                        color: "primary",
                        fontWeight: "medium",
                        _hover: { textDecoration: "underline" }
                    })}>
                        En savoir plus sur les tarifs
                    </Link>
                </p>
            </div>
        </div>
    )
}

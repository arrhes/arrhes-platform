import { Badge } from "@arrhes/ui"
import {
    IconAlertTriangle,
    IconChartBar,
    IconChartPie,
    IconTrendingUp
} from "@tabler/icons-react"
import type { ReactNode } from "react"
import { css } from "../../../utilities/cn.js"


export function AiAnalyse() {
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
                        Analyse des données
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    L'IA analyse vos données comptables pour vous fournir des insights et détecter des anomalies.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="Fonctionnalités d'analyse">
                    <p>
                        Notre système d'analyse utilise l'intelligence artificielle pour examiner vos données
                        comptables et vous fournir des informations utiles pour piloter votre activité.
                    </p>
                </Section>

                <div className={css({
                    display: "grid",
                    gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                    gap: "1rem",
                })}>
                    <FeatureCard
                        icon={<IconAlertTriangle />}
                        title="Détection d'anomalies"
                        description="L'IA identifie les écritures inhabituelles, les doublons potentiels et les erreurs de saisie courantes."
                    />
                    <FeatureCard
                        icon={<IconTrendingUp />}
                        title="Tendances et prévisions"
                        description="Analysez l'évolution de vos indicateurs clés et anticipez les tendances futures."
                    />
                    <FeatureCard
                        icon={<IconChartPie />}
                        title="Répartition des charges"
                        description="Visualisez automatiquement la répartition de vos dépenses par catégorie et par période."
                    />
                    <FeatureCard
                        icon={<IconChartBar />}
                        title="Comparaisons"
                        description="Comparez vos résultats avec les périodes précédentes ou avec des moyennes sectorielles."
                    />
                </div>

                <Section title="Détection d'anomalies">
                    <p>
                        Le système analyse automatiquement vos écritures pour détecter :
                    </p>
                    <ul className={css({
                        margin: 0,
                        paddingLeft: "1.5rem",
                        "& li": { marginBottom: "0.25rem" }
                    })}>
                        <li><strong>Doublons :</strong> Écritures similaires qui pourraient être des erreurs</li>
                        <li><strong>Montants inhabituels :</strong> Écritures dont le montant sort de la normale</li>
                        <li><strong>Écritures déséquilibrées :</strong> Écritures dont le total débit ne correspond pas au total crédit</li>
                        <li><strong>Comptes non conformes :</strong> Utilisation de comptes inappropriés pour certaines opérations</li>
                        <li><strong>Dates incohérentes :</strong> Écritures datées en dehors de l'exercice courant</li>
                    </ul>
                </Section>

                <Section title="Rapports automatiques">
                    <p>
                        L'IA génère automatiquement des rapports d'analyse à intervalles réguliers :
                    </p>
                    <ul className={css({
                        margin: 0,
                        paddingLeft: "1.5rem",
                        "& li": { marginBottom: "0.25rem" }
                    })}>
                        <li><strong>Rapport hebdomadaire :</strong> Synthèse des écritures de la semaine et anomalies détectées</li>
                        <li><strong>Rapport mensuel :</strong> Analyse des indicateurs clés et comparaison avec le mois précédent</li>
                        <li><strong>Rapport de clôture :</strong> Vérifications avant la clôture d'un exercice</li>
                    </ul>
                </Section>

                <Section title="Configuration">
                    <p>
                        Vous pouvez personnaliser les analyses selon vos besoins :
                    </p>
                    <ul className={css({
                        margin: 0,
                        paddingLeft: "1.5rem",
                        "& li": { marginBottom: "0.25rem" }
                    })}>
                        <li>Définir des seuils d'alerte personnalisés</li>
                        <li>Activer ou désactiver certains types de détection</li>
                        <li>Configurer la fréquence des rapports automatiques</li>
                        <li>Choisir les destinataires des notifications</li>
                    </ul>
                </Section>

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
                        <span className={css({ fontWeight: "semibold", color: "neutral" })}>Disponibilité : </span>
                        Les fonctionnalités d'analyse IA sont disponibles avec le forfait Pro.
                        Les utilisateurs du forfait gratuit ont accès à un aperçu limité des analyses.
                    </p>
                </div>
            </div>
        </div>
    )
}


function Section(props: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
        })}>
            <h2 className={css({
                fontSize: "md",
                fontWeight: "semibold",
                color: "neutral",
            })}>
                {props.title}
            </h2>
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                fontSize: "sm",
                color: "neutral/70",
                lineHeight: "relaxed",
                "& p": {
                    margin: 0
                },
                "& strong": {
                    color: "neutral",
                    fontWeight: "medium"
                }
            })}>
                {props.children}
            </div>
        </section>
    )
}


function FeatureCard(props: {
    icon: ReactNode
    title: string
    description: string
}) {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            padding: "1.5rem",
            borderRadius: "lg",
            border: "1px solid",
            borderColor: "neutral/10",
            backgroundColor: "white",
        })}>
            <div className={css({
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "md",
                backgroundColor: "primary/10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary",
                "& svg": {
                    width: "1.25rem",
                    height: "1.25rem"
                }
            })}>
                {props.icon}
            </div>
            <h3 className={css({
                fontSize: "md",
                fontWeight: "semibold",
                color: "neutral",
                margin: 0
            })}>
                {props.title}
            </h3>
            <p className={css({
                fontSize: "sm",
                color: "neutral/60",
                lineHeight: "relaxed",
                margin: 0
            })}>
                {props.description}
            </p>
        </div>
    )
}

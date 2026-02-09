import { Badge } from "@arrhes/ui"
import {
    IconBulb,
    IconFileText,
    IconMessage,
    IconSparkles
} from "@tabler/icons-react"
import type { ReactNode } from "react"
import { css } from "../../../utilities/cn.js"


export function AiAssistant() {
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
                        Assistant comptable
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Un assistant IA pour vous aider dans vos tâches comptables quotidiennes.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="Présentation">
                    <p>
                        L'assistant comptable d'Arrhes utilise l'intelligence artificielle pour vous
                        accompagner dans la gestion de votre comptabilité. Il comprend le langage naturel
                        et peut répondre à vos questions, vous suggérer des écritures et vous aider à
                        résoudre des problèmes courants.
                    </p>
                </Section>

                <div className={css({
                    display: "grid",
                    gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                    gap: "1rem",
                })}>
                    <FeatureCard
                        icon={<IconMessage />}
                        title="Questions en langage naturel"
                        description="Posez vos questions comme vous le feriez à un expert-comptable. L'assistant comprend le contexte et vous répond de manière précise."
                    />
                    <FeatureCard
                        icon={<IconSparkles />}
                        title="Suggestions d'écritures"
                        description="L'assistant peut suggérer des écritures comptables basées sur vos descriptions ou vos documents importés."
                    />
                    <FeatureCard
                        icon={<IconBulb />}
                        title="Aide contextuelle"
                        description="Obtenez de l'aide adaptée à la page où vous vous trouvez et aux données que vous consultez."
                    />
                    <FeatureCard
                        icon={<IconFileText />}
                        title="Explication des normes"
                        description="L'assistant vous explique les règles comptables françaises et vous guide dans leur application."
                    />
                </div>

                <Section title="Exemples de questions">
                    <div className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}>
                        <ExampleQuestion>
                            Comment comptabiliser l'achat d'un ordinateur à 1200 EUR HT ?
                        </ExampleQuestion>
                        <ExampleQuestion>
                            Quelle est la différence entre une charge et une immobilisation ?
                        </ExampleQuestion>
                        <ExampleQuestion>
                            Peux-tu m'expliquer le lettrage des comptes clients ?
                        </ExampleQuestion>
                        <ExampleQuestion>
                            Comment enregistrer une facture avec TVA déductible ?
                        </ExampleQuestion>
                        <ExampleQuestion>
                            Quel compte utiliser pour les frais de déplacement ?
                        </ExampleQuestion>
                    </div>
                </Section>

                <Section title="Limites">
                    <div className={css({
                        padding: "1rem",
                        borderRadius: "md",
                        backgroundColor: "warning/8",
                        border: "1px solid",
                        borderColor: "warning/20",
                    })}>
                        <p className={css({ margin: 0 })}>
                            <strong>Important :</strong> L'assistant IA est un outil d'aide à la décision.
                            Il ne remplace pas l'expertise d'un professionnel comptable. Pour les situations
                            complexes ou les décisions importantes, nous vous recommandons de consulter
                            un expert-comptable.
                        </p>
                    </div>
                </Section>

                <Section title="Confidentialité">
                    <p>
                        Vos échanges avec l'assistant sont confidentiels et ne sont pas utilisés pour
                        entraîner nos modèles. Les données comptables que vous partagez restent
                        privées et sécurisées.
                    </p>
                </Section>
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


function ExampleQuestion(props: { children: React.ReactNode }) {
    return (
        <div className={css({
            padding: "0.75rem 1rem",
            borderRadius: "md",
            backgroundColor: "neutral/5",
            fontSize: "sm",
            color: "neutral",
            fontStyle: "italic",
        })}>
            "{props.children}"
        </div>
    )
}

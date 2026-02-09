import type { ReactNode } from "react"
import { css } from "../../../../utilities/cn.js"
import { Pricing } from "../../../website/pricing.js"


export function Tarifs() {
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
                    Tarifs
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Un logiciel de comptabilité conçu pour être simple, transparent et facile à utiliser,
                    tout en respectant les exigences de la comptabilité française.
                </p>
            </div>

            {/* Pricing cards */}
            <Pricing />

            {/* FAQ */}
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
                    Questions fréquentes
                </h2>
                <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}>
                    <FaqItem
                        question="Puis-je changer de forfait à tout moment ?"
                        answer="Oui, vous pouvez passer au forfait Pro ou revenir au forfait gratuit à tout moment. Le changement prend effet immédiatement."
                    />
                    <FaqItem
                        question="Y a-t-il un engagement ?"
                        answer="Non, le forfait Pro est sans engagement. Vous pouvez annuler à tout moment et continuer à utiliser le service jusqu'à la fin de la période payée."
                    />
                    <FaqItem
                        question="Pourquoi avoir choisi ce modèle ?"
                        answer="Nous souhaitons démocratiser l'accès à la comptabilité au plus grand nombre. Nous avons ajouté l'offre Pro afin de pouvoir continuer à développer la plateforme."
                    />
                </div>
            </div>
        </div>
    )
}


function FeatureItem(props: {
    icon: ReactNode
    text: string
    highlighted?: boolean
}) {
    return (
        <div className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
        })}>
            <div className={css({
                width: "1.25rem",
                height: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: props.highlighted ? "primary" : "neutral/50",
                "& svg": {
                    width: "1rem",
                    height: "1rem"
                }
            })}>
                {props.icon}
            </div>
            <span className={css({
                fontSize: "sm",
                color: props.highlighted ? "primary" : "neutral/70",
                fontWeight: props.highlighted ? "medium" : "normal",
            })}>
                {props.text}
            </span>
        </div>
    )
}


function FaqItem(props: {
    question: string
    answer: string
}) {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
        })}>
            <h3 className={css({
                fontSize: "sm",
                fontWeight: "medium",
                color: "neutral",
            })}>
                {props.question}
            </h3>
            <p className={css({
                fontSize: "sm",
                color: "neutral/60",
                lineHeight: "relaxed",
                margin: 0,
            })}>
                {props.answer}
            </p>
        </div>
    )
}

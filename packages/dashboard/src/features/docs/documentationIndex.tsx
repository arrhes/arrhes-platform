import { ButtonContent } from "@arrhes/ui"
import { IconBook, IconChevronRight } from "@tabler/icons-react"
import { DocLinkCard } from "../../components/document/docLinkCard.js"
import { LinkButton } from "../../components/linkButton.js"
import { css } from "../../utilities/cn.js"


export function DocumentationIndex() {
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
                    Documentation
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Bienvenue dans la documentation d'Arrhes. Vous pouvez ici découvrir le logiciel, comment l'utiliser ou encore
                    reprendre les bases de la comptabilité ou explorez notre API.
                </p>
            </div>

            {/* Quick links to other sections */}
            <div className={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                gap: "1rem",
            })}>
                <DocLinkCard
                    icon={<IconBook />}
                    iconColor="primary"
                    title="Comptabilité"
                    description="Cours de comptabilité et guide d'utilisation du logiciel."
                    to="/documentation/comptabilite"
                />
                <DocLinkCard
                    icon={<IconBook />}
                    iconColor="primary"
                    title="Dashboard"
                    description="Cours de comptabilité et guide d'utilisation du logiciel."
                    to="/documentation/dashboard"
                />
                {/* <DocLinkCard
                    icon={<IconCode />}
                    iconColor="primary"
                    title="API"
                    description="Documentation de l'API REST pour intégrer Arrhes à vos outils."
                    to="/documentation/api"
                /> */}
                {/* <DocLinkCard
                    icon={<IconRobot />}
                    iconColor="primary"
                    title="Intelligence Artificielle"
                    description="Découvrez l'assistant IA pour faire passer votre comptabilité à la vitesse supérieure."
                    to="/documentation/ai"
                /> */}
            </div>

            {/* About section */}
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
                    À propos d'Arrhes
                </h2>
                <p className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}>
                    Arrhes est un logiciel de comptabilité open source conçu pour les entreprises et associations.
                    Simple, moderne et respectueux des normes comptables françaises, il vous permet de gérer
                    vos écritures comptables, générer vos documents fiscaux et collaborer avec votre équipe.
                </p>
                <div className={css({
                    display: "flex",
                    gap: "0.5rem",
                })}>
                    <LinkButton
                        to="/documentation/fonctionnalites"
                    >
                        <ButtonContent
                            variant="default"
                            text="Voir les fonctionnalités"
                            rightIcon={<IconChevronRight />}
                        />
                    </LinkButton>
                </div>
            </div>
        </div>
    )
}

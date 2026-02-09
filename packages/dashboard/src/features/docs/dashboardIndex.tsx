import { ButtonContent } from "@arrhes/ui"
import { IconChevronRight, IconLayout, IconRocket } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { DocLink } from "../../components/document/docLink.js"
import { DocLinkCard } from "../../components/document/docLinkCard.js"
import { DocTip } from "../../components/document/docTip.js"
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

            {/* Quick start card */}
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
                <Link to="/documentation/dashboard/demarrage">
                    <ButtonContent
                        variant="primary"
                        text="Commencer"
                        rightIcon={<IconChevronRight />}
                    />
                </Link>
            </div>

            {/* Guide sections */}
            <div className={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
                gap: "1rem",
            })}>
                <DocLinkCard
                    icon={<IconRocket />}
                    iconColor="success"
                    title="Démarrage"
                    description="Créez votre compte, configurez votre organisation et paramétrez votre plan comptable."
                    to="/documentation/dashboard/demarrage"
                />
                <DocLinkCard
                    icon={<IconLayout />}
                    iconColor="success"
                    title="Organisations"
                    description="Gérez vos organisations, invitez des collaborateurs et configurez les permissions."
                    to="/documentation/dashboard/organisations"
                />
                <DocLinkCard
                    icon={<IconLayout />}
                    iconColor="success"
                    title="Saisie des écritures"
                    description="Apprenez à saisir vos écritures comptables rapidement et efficacement."
                    to="/documentation/dashboard/ecritures"
                />
                <DocLinkCard
                    icon={<IconLayout />}
                    iconColor="success"
                    title="Rapports"
                    description="Générez vos documents comptables : bilan, compte de résultat, balance et plus."
                    to="/documentation/dashboard/rapports"
                />
            </div>


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

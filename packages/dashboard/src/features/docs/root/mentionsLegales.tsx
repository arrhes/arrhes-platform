import { DocTip } from "../../../components/document/docTip.js"
import { css } from "../../../utilities/cn.js"


export function MentionsLegales() {
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
                    Mentions légales
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Informations légales relatives à l'utilisation du site et du service Arrhes.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="Éditeur du site">
                    <p>
                        Le site arrhes.fr est édité par Arrhes SAS, société par actions simplifiée
                        au capital de 1 000 euros, immatriculée au Registre du Commerce et des Sociétés
                        de Paris sous le numéro XXX XXX XXX.
                    </p>
                    <p>
                        <strong>Siège social :</strong> [Adresse à compléter]<br />
                        <strong>Numéro de TVA intracommunautaire :</strong> FR XX XXX XXX XXX<br />
                        <strong>Directeur de la publication :</strong> [Nom à compléter]<br />
                        <strong>Contact :</strong> contact@arrhes.fr
                    </p>
                </Section>

                <Section title="Hébergement">
                    <p>
                        Le site est hébergé par :<br />
                        [Nom de l'hébergeur]<br />
                        [Adresse de l'hébergeur]<br />
                        [Téléphone de l'hébergeur]
                    </p>
                </Section>

                <Section title="Propriété intellectuelle">
                    <p>
                        L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.)
                        est protégé par les lois relatives à la propriété intellectuelle.
                    </p>
                    <p>
                        Le code source d'Arrhes est distribué sous licence open source.
                        Consultez notre dépôt GitHub pour plus d'informations sur les conditions d'utilisation.
                    </p>
                </Section>

                <Section title="Données personnelles">
                    <p>
                        Les informations relatives au traitement de vos données personnelles sont
                        détaillées dans notre <a href="/documentation/confidentialite" className={css({
                            color: "primary",
                            textDecoration: "underline"
                        })}>Politique de confidentialité</a>.
                    </p>
                </Section>

                <Section title="Cookies">
                    <p>
                        Ce site utilise des cookies strictement nécessaires au fonctionnement du service.
                        Aucun cookie publicitaire ou de traçage n'est utilisé.
                    </p>
                </Section>

                <Section title="Limitation de responsabilité">
                    <p>
                        Arrhes s'efforce de fournir des informations exactes et à jour sur ce site.
                        Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité
                        des informations diffusées.
                    </p>
                    <p>
                        L'utilisateur est seul responsable de l'utilisation qu'il fait des informations
                        et fonctionnalités disponibles sur ce site.
                    </p>
                </Section>

                <DocTip variant="info">
                    Oui, pour notre comptabilité, nous utilisons Arrhes. ;)
                </DocTip>

                <div className={css({
                    padding: "1rem",
                    borderRadius: "lg",
                    backgroundColor: "neutral/5",
                    fontSize: "sm",
                    color: "neutral/60",
                })}>
                    Dernière mise à jour : Janvier 2026
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

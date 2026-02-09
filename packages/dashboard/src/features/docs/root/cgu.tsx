import { css } from "../../../utilities/cn.js"


export function Cgu() {
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
                    Conditions Générales d'Utilisation
                </h1>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Conditions régissant l'utilisation du service Arrhes.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Section title="1. Objet">
                    <p>
                        Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir
                        les modalités et conditions d'utilisation du service Arrhes, accessible à l'adresse
                        arrhes.fr.
                    </p>
                    <p>
                        En utilisant le service, l'utilisateur accepte sans réserve les présentes CGU.
                    </p>
                </Section>

                <Section title="2. Description du service">
                    <p>
                        Arrhes est un logiciel de comptabilité en ligne permettant aux entreprises et
                        associations de gérer leur comptabilité, saisir des écritures, générer des documents
                        comptables et collaborer en équipe.
                    </p>
                    <p>
                        Le service est proposé en version gratuite avec des fonctionnalités limitées,
                        et en version payante avec des fonctionnalités étendues.
                    </p>
                </Section>

                <Section title="3. Inscription et compte">
                    <p>
                        L'utilisation du service nécessite la création d'un compte utilisateur.
                        L'utilisateur s'engage à fournir des informations exactes et à jour lors de
                        son inscription.
                    </p>
                    <p>
                        L'utilisateur est responsable de la confidentialité de ses identifiants de
                        connexion et de toutes les activités effectuées depuis son compte.
                    </p>
                </Section>

                <Section title="4. Utilisation du service">
                    <p>L'utilisateur s'engage à :</p>
                    <ul>
                        <li>Utiliser le service conformément à sa destination</li>
                        <li>Ne pas utiliser le service à des fins illégales ou frauduleuses</li>
                        <li>Ne pas tenter de compromettre la sécurité du service</li>
                        <li>Respecter les droits de propriété intellectuelle</li>
                        <li>Ne pas collecter de données d'autres utilisateurs sans autorisation</li>
                    </ul>
                </Section>

                <Section title="5. Données et responsabilité">
                    <p>
                        L'utilisateur est seul responsable des données qu'il saisit dans le service.
                        Arrhes ne peut être tenu responsable des erreurs comptables résultant d'une
                        mauvaise utilisation du service.
                    </p>
                    <p>
                        L'utilisateur est encouragé à vérifier ses données et à consulter un
                        professionnel comptable en cas de doute.
                    </p>
                </Section>

                <Section title="6. Propriété intellectuelle">
                    <p>
                        Le code source d'Arrhes est distribué sous licence open source. Les conditions
                        spécifiques de cette licence sont disponibles sur notre dépôt GitHub.
                    </p>
                    <p>
                        Les marques, logos et contenus graphiques restent la propriété d'Arrhes SAS.
                    </p>
                </Section>

                <Section title="7. Protection des données">
                    <p>
                        Le traitement des données personnelles est décrit dans notre{" "}
                        <a href="/documentation/confidentialite" className={css({
                            color: "primary",
                            textDecoration: "underline"
                        })}>Politique de confidentialité</a>.
                    </p>
                </Section>

                <Section title="8. Résiliation">
                    <p>
                        L'utilisateur peut supprimer son compte à tout moment depuis les paramètres
                        de son profil. La suppression entraîne l'effacement de toutes les données
                        associées au compte.
                    </p>
                    <p>
                        Arrhes se réserve le droit de suspendre ou supprimer un compte en cas de
                        violation des présentes CGU.
                    </p>
                </Section>

                <Section title="9. Modification des CGU">
                    <p>
                        Arrhes se réserve le droit de modifier les présentes CGU à tout moment.
                        Les utilisateurs seront informés de toute modification substantielle par
                        email ou notification dans l'application.
                    </p>
                </Section>

                <Section title="10. Droit applicable">
                    <p>
                        Les présentes CGU sont soumises au droit français. En cas de litige, les
                        tribunaux de Paris seront seuls compétents.
                    </p>
                </Section>

                <div className={css({
                    padding: "1rem",
                    borderRadius: "md",
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
                "& ul": {
                    margin: 0,
                    paddingLeft: "1.5rem"
                },
                "& li": {
                    marginBottom: "0.25rem"
                }
            })}>
                {props.children}
            </div>
        </section>
    )
}

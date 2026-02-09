import { DocDefinition } from "../../../components/document/docDefinition.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocSection } from "../../../components/document/docSection.js"


export function GuideOrganisations() {
    return (
        <div>
            <DocHeader
                title="Gérer les organisations"
                description="Configuration et administration de vos structures"
            />

            <DocSection title="Types d'organisations">
                <DocParagraph>
                    Arrhes supporte deux types d'organisations, chacun avec un plan comptable adapté :
                </DocParagraph>
                <DocDefinition
                    term="Entreprise"
                    definition="Plan comptable général (PCG) adapté aux sociétés commerciales. Inclut les comptes de TVA, de capital social, etc."
                />
                <DocDefinition
                    term="Association"
                    definition="Plan comptable des associations. Inclut les comptes spécifiques comme les cotisations (756), les subventions (74), les fonds associatifs..."
                />
                <DocParagraph>
                    Le type d'organisation est défini à la création et ne peut pas être modifié ensuite.
                    Si vous avez fait une erreur, vous devrez créer une nouvelle organisation.
                </DocParagraph>
            </DocSection>

            <DocSection title="Paramètres de l'organisation">
                <DocParagraph>
                    Chaque organisation possède des paramètres que vous pouvez modifier :
                </DocParagraph>
                <DocList items={[
                    "Nom : le nom affiché dans l'interface",
                    "SIREN : le numéro d'identification (pour les entreprises)",
                    "Email de contact : pour les notifications et rapports"
                ]} />
                <DocExample title="Modifier les paramètres">
                    <DocList items={[
                        "Accédez à votre organisation",
                        "Cliquez sur l'onglet « Paramètres »",
                        "Modifiez les informations souhaitées",
                        "Enregistrez les modifications"
                    ]} />
                </DocExample>
            </DocSection>

            <DocSection title="Gestion des membres">
                <DocParagraph>
                    Vous pouvez inviter d'autres personnes à accéder à votre organisation.
                    Chaque membre peut avoir des droits différents.
                </DocParagraph>
                <DocDefinition
                    term="Administrateur"
                    definition="Accès complet : peut modifier les paramètres, inviter des membres, supprimer l'organisation."
                />
                <DocDefinition
                    term="Membre"
                    definition={<>Accès limité : peut <DocLink to="/documentation/dashboard/ecritures">saisir des écritures</DocLink> et <DocLink to="/documentation/dashboard/rapports">consulter les rapports</DocLink>, mais ne peut pas modifier les paramètres.</>}
                />
                <DocExample title="Inviter un membre">
                    <DocList items={[
                        "Allez dans Paramètres → Membres",
                        "Cliquez sur « Inviter un membre »",
                        "Entrez l'adresse email de la personne",
                        "Choisissez son rôle (Administrateur ou Membre)",
                        "Envoyez l'invitation"
                    ]} />
                    <DocParagraph>
                        La personne recevra un email avec un lien pour rejoindre l'organisation.
                    </DocParagraph>
                </DocExample>
            </DocSection>

            <DocSection title="Les exercices comptables">
                <DocParagraph>
                    Chaque organisation contient un ou plusieurs exercices comptables.
                    Un exercice représente une période (généralement 12 mois) pendant laquelle
                    vous enregistrez vos opérations.
                </DocParagraph>
                <DocParagraph>
                    Pour comprendre ce qu'est un exercice comptable, consultez la page sur les{" "}
                    <DocLink to="/documentation/comptabilite">principes fondamentaux</DocLink>.
                </DocParagraph>
                <DocList items={[
                    "Vous ne pouvez avoir qu'un seul exercice en cours à la fois",
                    "Les exercices clôturés ne peuvent plus être modifiés",
                    "À la clôture, le résultat est reporté dans l'exercice suivant"
                ]} />
            </DocSection>

            <DocSection title="Configuration du plan comptable">
                <DocParagraph>
                    Le plan comptable est la liste des comptes disponibles pour saisir vos écritures.
                    Arrhes crée automatiquement un plan comptable standard, mais vous pouvez le personnaliser.
                </DocParagraph>
                <DocExample title="Ajouter un compte">
                    <DocList items={[
                        "Accédez à l'exercice concerné",
                        "Allez dans Paramètres → Comptes",
                        "Cliquez sur « Ajouter un compte »",
                        "Définissez le numéro et l'intitulé du compte",
                        "Enregistrez"
                    ]} />
                    <DocParagraph>
                        Pour comprendre la numérotation des comptes, consultez la page sur les{" "}
                        <DocLink to="/documentation/comptabilite/comptes">comptes comptables</DocLink>.
                    </DocParagraph>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux">
                <DocParagraph>
                    Les journaux permettent de classer vos écritures par type d'opération.
                    Des journaux par défaut sont créés automatiquement (Achats, Ventes, Banque, Caisse, Opérations diverses).
                </DocParagraph>
                <DocParagraph>
                    Vous pouvez créer des journaux supplémentaires si nécessaire (ex : un journal par compte bancaire
                    si vous en avez plusieurs).
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/documentation/dashboard/ecritures"
                label="Saisir des écritures"
            />
        </div>
    )
}
